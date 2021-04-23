type Action =
	| { type: 'ADD_PREFETCHED_USERS' }
	| { type: 'ADD_USERS'; results: API.User[] }
	| { type: 'END_OF_USER_CATALOG' }
	| { type: 'FETCH_END' }
	| { type: 'FETCH_START' }
	| { type: 'PREFETCH_USERS'; results: API.User[] }
	| { type: 'SET_NATIONALITY_FILTER'; nationality: Nationality }
	| { type: 'SET_SEARCH'; search: string };

type Dispatch = React.Dispatch<Action>;

type FetchUsers = (params?: API.Params) => void;

type SetNationalityFilter = (nationality: Nationality) => void;

interface State {
	endOfUserCatalog: boolean;
	fetching: boolean;
	nationalityFilter: Nationality[];
	prefetchedResults: API.User[];
	results: API.User[];
	search: string;
}

interface Context {
	state: State;
	dispatch: Dispatch;
}
