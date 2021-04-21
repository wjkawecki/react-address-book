declare namespace UsersContext {
	type Nationalities = ('CH' | 'ES' | 'FR' | 'GB')[];

	type Action =
		| { type: 'addUsers'; payload: API.User[] }
		| { type: 'setNationalities'; payload: Nationalities };

	interface State {
		users: API.User[];
		nationalities: Nationalities;
	}

	interface Context {
		state: State;
		dispatch: React.Dispatch<UsersContext.Action>;
	}
}
