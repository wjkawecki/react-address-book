/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import { useUsers } from '../../context/usersContext';
import useIntersecionObserver from '../../utils/useIntersectionObserver';
import UserCard from '../UserCard/UserCard';
import styles from './UserList.module.scss';

const UserList: React.FC = (): React.ReactElement => {
	const loader = useRef<HTMLDivElement>(null);
	const { isIntersecting } = useIntersecionObserver(loader);
	const { context, fetchUsers } = useUsers();
	const {
		state: { results },
	} = context;

	useEffect(() => {
		if (isIntersecting) {
			fetchUsers();
		}
	}, [isIntersecting]);

	return (
		<div className={styles.base}>
			{!!results.length && (
				<ul className={styles.list}>
					{results.map((user) => (
						<li key={user.login?.uuid}>
							<UserCard user={user} />
						</li>
					))}
				</ul>
			)}
			<div ref={loader} />
		</div>
	);
};

export default UserList;
