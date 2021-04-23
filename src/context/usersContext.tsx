import React, { createContext, useContext, useReducer } from 'react';
import apiFetcher from '../utils/api';

// Possible nationalities of fetched users
export enum Nationality {
	CH = 'CH',
	ES = 'ES',
	FR = 'FR',
	GB = 'GB',
}

export const LOCAL_STORAGE_NATIONALITY_FILTER_KEY = 'nationalityFilter';

const storedNationalityFilter = localStorage.getItem(LOCAL_STORAGE_NATIONALITY_FILTER_KEY);
const defaultNationalityFilter = Object.values(Nationality);
const defaultState: State = {
	fetching: false,
	nationalityFilter: storedNationalityFilter
		? JSON.parse(storedNationalityFilter)
		: defaultNationalityFilter,
	search: '',
	results: [],
	prefetchedResults: [],
	endOfUserCatalog: false,
};

const UsersContext = createContext<Context>({
	state: defaultState,
	dispatch: () => {},
});

const usersReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'ADD_USERS':
			return { ...state, results: [...state.results, ...action.results] };

		case 'ADD_PREFETCHED_USERS':
			return {
				...state,
				results: [...state.results, ...state.prefetchedResults],
				prefetchedResults: [],
			};

		case 'END_OF_USER_CATALOG':
			return { ...state, endOfUserCatalog: true };

		case 'PREFETCH_USERS':
			return { ...state, prefetchedResults: action.results };

		case 'FETCH_START':
			return { ...state, fetching: true };

		case 'FETCH_END':
			return { ...state, fetching: false };

		case 'SET_NATIONALITY_FILTER': {
			let nationalityFilter: Nationality[];

			if (state.nationalityFilter.includes(action.nationality)) {
				nationalityFilter = state.nationalityFilter.filter((nat) => nat !== action.nationality);
			} else {
				nationalityFilter = [...state.nationalityFilter, action.nationality];
			}

			localStorage.setItem(LOCAL_STORAGE_NATIONALITY_FILTER_KEY, JSON.stringify(nationalityFilter));

			return {
				...state,
				nationalityFilter,
			};
		}

		case 'SET_SEARCH':
			return { ...state, search: action.search };

		default:
			// will never happen thanks to TypeScript
			return state;
	}
};

export const UsersProvider: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(usersReducer, defaultState);
	const value = { state, dispatch };

	return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
};

export const useUsers = (): {
	context: Context;
	fetchUsers: FetchUsers;
	setNationalityFilter: SetNationalityFilter;
} => {
	const context = useContext(UsersContext);

	if (context === undefined) {
		throw new Error('useUsers must be used within a UsersProvider');
	}

	const { state, dispatch } = context;

	// Filter results ...
	const filteredResults = state.results.filter(({ name, nat }) => {
		let meetsConditions = true;

		// ... by nationalityFilter ...
		if (meetsConditions && state.nationalityFilter.length) {
			meetsConditions = state.nationalityFilter.includes(nat as Nationality);
		}

		// ... by case insensitive search in `name.first + name.last`
		if (meetsConditions && state.search) {
			meetsConditions = `${name.first}${name.last}`
				.toLowerCase()
				.includes(state.search.toLowerCase());
		}

		return meetsConditions;
	});

	const fetchSequence = (type: 'ADD_USERS' | 'PREFETCH_USERS', params?: API.Params) => {
		// Since https://randomuser.me/documentation#pagination doesn't have a limit for requesting users
		// we have to artificially stop fetching users after getting 1000 results
		if (state.results.length + state.prefetchedResults.length >= 1000) {
			dispatch({ type: 'END_OF_USER_CATALOG' });
			return;
		}

		dispatch({ type: 'FETCH_START' });
		apiFetcher({ ...params, nat: state.nationalityFilter })
			.then((response) => dispatch({ type, ...response }))
			.then(() => dispatch({ type: 'FETCH_END' }));
	};

	const fetchUsers: FetchUsers = (params) => {
		// Prevent multiple simultaneous requests and block fetching when search is active
		if (state.fetching || state.search) return;

		if (state.prefetchedResults.length) {
			dispatch({ type: 'ADD_PREFETCHED_USERS' });
		} else {
			fetchSequence('ADD_USERS', params);
		}

		window.requestIdleCallback(() => {
			fetchSequence('PREFETCH_USERS', params);
		});
	};

	const setNationalityFilter: SetNationalityFilter = (nationality) => {
		dispatch({ type: 'SET_NATIONALITY_FILTER', nationality });
	};

	// Don't mutate the state directly, in case we would want to change the filtering again
	const filteredContext = { ...context, state: { ...state, results: filteredResults } };

	return { context: filteredContext, fetchUsers, setNationalityFilter };
};
