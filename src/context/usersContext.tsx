import React, { createContext, useContext, useReducer } from 'react';

type Action =
	| { type: 'ADD_USERS'; users: API.User[] }
	| { type: 'SET_NATIONALITY_FILTER'; nationality: UserNationality };

interface State {
	users: API.User[];
	nationalityFilter: UserNationality[];
}

interface Context {
	state: State;
	dispatch: React.Dispatch<Action>;
}

// Nationalities that can be used for User filtering
enum UserNationality {
	CH = 'CH',
	ES = 'ES',
	FR = 'FR',
	GB = 'GB',
}

const LOCAL_STORAGE_NATIONALITY_FILTER_KEY = 'nationalityFilter';
const storedNationalityFilter = localStorage.getItem(LOCAL_STORAGE_NATIONALITY_FILTER_KEY);
const defaultState: State = {
	users: [],
	nationalityFilter: storedNationalityFilter ? JSON.parse(storedNationalityFilter) : [],
};

const UsersContext = createContext<Context>({
	state: defaultState,
	dispatch: () => {},
});

const usersReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'ADD_USERS':
			return { ...state, users: [...state.users, ...action.users] };

		case 'SET_NATIONALITY_FILTER': {
			let nationalityFilter: UserNationality[];

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

	return context;
};

export { UsersProvider, useUsers, UserNationality };
