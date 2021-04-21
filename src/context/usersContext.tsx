import React, { createContext, useContext, useReducer } from 'react';

type Action =
	| { type: 'ADD_USERS'; results: API.User[] }
	| { type: 'FETCH_START' }
	| { type: 'FETCH_END' }
	| { type: 'SET_NATIONALITY_FILTER'; nationality: Nationality }
	| { type: 'SET_SEARCH'; search: string };

interface State {
	fetching: boolean;
	nationalityFilter: Nationality[];
	search: string;
	results: API.User[];
}

interface Context {
	state: State;
	dispatch: React.Dispatch<Action>;
}

// Possible nationalities of fetched users
enum Nationality {
	CH = 'CH',
	ES = 'ES',
	FR = 'FR',
	GB = 'GB',
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

const UsersProvider: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(usersReducer, defaultState);
	const value = { state, dispatch };

	return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
};

const useUsers = (): Context => {
	const context = useContext(UsersContext);

	if (context === undefined) {
		throw new Error('useUsers must be used within a UsersProvider');
	}

	// Filter results ...
	const filteredResults = context.state.results.filter(({ name, nat }) => {
		let meetsConditions = true;

		// ... by nationalityFilter ...
		if (meetsConditions && context.state.nationalityFilter.length) {
			meetsConditions = context.state.nationalityFilter.includes(nat as Nationality);
		}

		// ... by case insensitive search in `name.first + name.last`
		if (meetsConditions && context.state.search) {
			meetsConditions = `${name.first}${name.last}`
				.toLowerCase()
				.includes(context.state.search.toLowerCase());
		}

		return meetsConditions;
	});

	// Don't mutate the state directly, in case
	// we would want to change the filtering again
	return { ...context, state: { ...context.state, results: filteredResults } };
};

export { UsersProvider, useUsers, Nationality };
