import React, { createContext, useContext, useReducer } from 'react';
import apiFetcher from '../utils/api';

// Possible nationalities of fetched users
export enum Nationality {
	CH = 'CH',
	ES = 'ES',
	FR = 'FR',
	GB = 'GB',
}

export type Action =
	| { type: 'ADD_USERS'; results: API.User[] }
	| { type: 'FETCH_START' }
	| { type: 'FETCH_END' }
	| { type: 'SET_NATIONALITY_FILTER'; nationality: Nationality }
	| { type: 'SET_SEARCH'; search: string };

export type Dispatch = React.Dispatch<Action>;

type FetchUsers = (params?: API.Params) => void;

type SetNationalityFilter = (nationality: Nationality) => void;

export interface State {
	fetching: boolean;
	nationalityFilter: Nationality[];
	search: string;
	results: API.User[];
}

export interface Context {
	state: State;
	dispatch: Dispatch;
}

const LOCAL_STORAGE_NATIONALITY_FILTER_KEY = 'nationalityFilter';
const storedNationalityFilter = localStorage.getItem(LOCAL_STORAGE_NATIONALITY_FILTER_KEY);
const defaultNationalityFilter = Object.values(Nationality);
const defaultState: State = {
	fetching: false,
	nationalityFilter: storedNationalityFilter
		? JSON.parse(storedNationalityFilter)
		: defaultNationalityFilter,
	search: '',
	results: [],
};

const UsersContext = createContext<Context>({
	state: defaultState,
	dispatch: () => {},
});

const usersReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'ADD_USERS':
			return { ...state, results: [...state.results, ...action.results] };

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

	const fetchUsers: FetchUsers = (params) => {
		// Prevent multiple simultaneous requests and block fetching when search is active
		if (state.fetching || state.search) return;

		dispatch({ type: 'FETCH_START' });
		apiFetcher({ ...params, nat: state.nationalityFilter })
			.then((response) => dispatch({ type: 'ADD_USERS', ...response }))
			.then(() => dispatch({ type: 'FETCH_END' }));
	};

	const setNationalityFilter: SetNationalityFilter = (nationality) => {
		dispatch({ type: 'SET_NATIONALITY_FILTER', nationality });
	};

	// Don't mutate the state directly, in case we would want to change the filtering again
	const filteredContext = { ...context, state: { ...state, results: filteredResults } };

	return { context: filteredContext, fetchUsers, setNationalityFilter };
};
