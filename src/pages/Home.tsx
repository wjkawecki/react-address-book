import { useEffect } from 'react';
import Search from '../components/Search/Search';
import { useUsers } from '../context/usersContext';
import fetchUsers from '../utils/api';

const PageHome: React.FC = (): React.ReactElement => {
	const {
		state: { users },
		dispatch,
	} = useUsers();

	useEffect(() => {
		const init = async () => {
			const response = await fetchUsers();

			dispatch({ type: 'addUsers', payload: response.results });
		};

		init();
	}, [dispatch]);

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
