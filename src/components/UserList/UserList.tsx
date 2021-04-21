import { useEffect } from 'react';
import { useUsers } from '../../context/usersContext';
import fetchUsers from '../../utils/api';
import styles from './UserList.module.scss';

const UserList: React.FC = (): React.ReactElement => {
	const {
		state: { results, nationalityFilter, fetching },
		dispatch,
	} = useUsers();

	useEffect(() => {
		if (fetching || results.length) return;

		dispatch({ type: 'FETCH_START' });
		fetchUsers({ nat: nationalityFilter })
			.then((response) => dispatch({ type: 'ADD_USERS', ...response }))
			.then(() => dispatch({ type: 'FETCH_END' }));

		// disabling react-hooks/exhaustive-deps as we
		// really want to run this code only once
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<p>Fetching: {`${fetching}`}</p>
			<ul className={styles.base}>
				{!!results.length &&
					results.map((user) => (
						<li key={user.login?.uuid}>{`${user.name?.first} ${user.name?.last} [${user.nat}]`}</li>
					))}
			</ul>
		</div>
	);
};

export default UserList;
