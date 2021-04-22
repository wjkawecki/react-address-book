/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import { useUsers } from '../../context/usersContext';
import useIntersecionObserver from '../../utils/useIntersectionObserver';
import UserCard from '../UserCard/UserCard';
import styles from './UserList.module.scss';

const intersectionOptions = {
	root: null,
	rootMargin: '150px',
	threshold: 1.0,
};

const UserList: React.FC = (): React.ReactElement => {
	const loader = useRef<HTMLDivElement>(null);
	const { isIntersecting } = useIntersecionObserver(loader, intersectionOptions);
	const { context, fetchUsers } = useUsers();
	const {
		state: { results, endOfUserCatalog },
	} = context;

	// fetch more users when the 'loader' div is visible or 150px from screen edge
	useEffect(() => {
		if (isIntersecting) {
			fetchUsers();
		}
	}, [isIntersecting]);

	return (
		<>
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
			</div>

			{endOfUserCatalog ? (
				<section className="padding">
					<p className="center-text">End of user catalog!</p>
				</section>
			) : (
				<div ref={loader} />
			)}
		</>
	);
};

export default UserList;
