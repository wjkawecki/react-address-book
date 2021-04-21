import { useEffect } from 'react';
import { useUsers } from '../../context/usersContext';
import fetchUsers from '../../utils/api';
import styles from './UserList.module.scss';

const UserList: React.FC = (): React.ReactElement => {
	const {
		state: { users },
		dispatch,
	} = useUsers();

	useEffect(() => {
		// do the initial fetch only if there are no users yet
		if (users.length) return;

		const init = async () => {
			const response = await fetchUsers({ results: 50 });

			dispatch({ type: 'ADD_USERS', users: response.results });
		};

		init();
	}, [dispatch, users.length]);

	return (
		<ul>
			{!!users.length &&
				users.map((user) => (
					<li key={user.login?.uuid}>{`${user.name?.first} ${user.name?.last} [${user.nat}]`}</li>
				))}
		</ul>
	);
};

export default UserList;
