import React, { createContext, useContext, useReducer } from 'react';

const defaultState: UsersContext.State = {
	users: [],
	nationalities: [],
};

const UsersContext = createContext<UsersContext.Context>({
	state: defaultState,
	dispatch: () => {},
});

const usersReducer = (
	state: UsersContext.State,
	action: UsersContext.Action
): UsersContext.State => {
	switch (action.type) {
		case 'addUsers': {
			return { ...state, users: [...state.users, ...action.payload] };
		}
		case 'setNationalities': {
			return { ...state, nationalities: action.payload };
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

const useUsers = (): UsersContext.Context => {
	const context = useContext(UsersContext);

	if (context === undefined) {
		throw new Error('useUsers must be used within a UsersProvider');
	}

	return context;
};

export { UsersProvider, useUsers };
