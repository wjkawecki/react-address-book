import React, { createContext, useContext, useReducer } from 'react';

type Action =
	| { type: 'addUsers'; payload: API.User[] }
	| { type: 'setNationality'; payload: UserNationality };

interface State {
	users: API.User[];
	nationalities: UserNationality[];
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

const LOCAL_STORAGE_NATIONALITIES_KEY = 'nationalities';
const storedNationalities = localStorage.getItem(LOCAL_STORAGE_NATIONALITIES_KEY);
const defaultState: State = {
	users: [],
	nationalities: storedNationalities ? JSON.parse(storedNationalities) : [],
};

const UsersContext = createContext<Context>({
	state: defaultState,
	dispatch: () => {},
});

const usersReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'addUsers': {
			return { ...state, users: [...state.users, ...action.payload] };
		}

		case 'setNationality': {
			let newNationalities: UserNationality[];

			if (state.nationalities.includes(action.payload)) {
				newNationalities = state.nationalities.filter((nat) => nat !== action.payload);
			} else {
				newNationalities = [...state.nationalities, action.payload];
			}

			localStorage.setItem(LOCAL_STORAGE_NATIONALITIES_KEY, JSON.stringify(newNationalities));

			return {
				...state,
				nationalities: newNationalities,
			};
		}
		default: {
			throw new Error(`Unhandled action type`);
		}
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
