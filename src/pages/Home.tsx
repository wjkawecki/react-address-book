import { useEffect, useState } from 'react';
import Search from '../components/Search/Search';
import fetchUsers from '../utils/api';

const PageHome: React.FC = (): React.ReactElement => {
	const [users, setUsers] = useState<API.User[]>([]);

	useEffect(() => {
		const init = async () => {
			const response = await fetchUsers();

			setUsers(response.results);
		};

		init();
	}, []);

	console.log(users);

	return (
		<main>
			<Search />
			{users.map((user) => (
				<div key={user.login.uuid}>{`${user.name.first} ${user.name.last}`}</div>
			))}
		</main>
	);
};

export default PageHome;
