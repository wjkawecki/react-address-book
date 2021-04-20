const fetchUsers = async (): Promise<API.Response> => {
	const response: Response = await fetch(
		'https://randomuser.me/api/?inc=email,login,name,nat,picture,location,phone,cell&results=5'
	);

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	return response.json();
};

export default fetchUsers;
