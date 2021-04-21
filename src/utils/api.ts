import queryString from 'query-string';

// https://randomuser.me/documentation

const defaultParams: API.Params = {
	inc: ['email', 'login', 'name', 'nat', 'picture', 'location', 'phone', 'cell'],
	results: 5,
};

const fetchUsers = async (params: API.Params = {}): Promise<API.Response> => {
	const url = queryString.stringifyUrl(
		{
			url: 'https://randomuser.me/api',
			query: { ...defaultParams, ...params },
		},
		{ arrayFormat: 'comma' }
	);

	const response: Response = await fetch(url);

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	return response.json();
};

export default fetchUsers;
