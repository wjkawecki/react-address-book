/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useUsers } from '../../context/usersContext';
import useIntersecionObserver from '../../utils/useIntersectionObserver';
import Modal from '../Modal/Modal';
import UserCard from '../UserCard/UserCard';
import styles from './UserList.module.scss';

const intersectionOptions = {
	root: null,
	rootMargin: '150px',
	threshold: 1.0,
};

const UserList: React.FC = (): React.ReactElement => {
	const loader = useRef<HTMLDivElement>(null);
	const [isOpen, setOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<API.User>();
	const { isIntersecting } = useIntersecionObserver(loader, intersectionOptions);
	const { context, fetchUsers } = useUsers();
	const {
		state: { results, endOfUserCatalog },
	} = context;

	const openUserInfo = (user: API.User) => {
		setSelectedUser(user);
		setOpen(true);
	};

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
								<UserCard user={user} onClick={() => openUserInfo(user)} />
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

			<Modal isOpen={isOpen} onRequestClose={() => setOpen(false)}>
				<p>User location details:</p>
				<table className={styles.table}>
					<tr>
						<td>Street</td>
						<td>
							{`${selectedUser?.location.street.name} ${selectedUser?.location.street.number}`}
						</td>
					</tr>
					<tr>
						<td>City</td>
						<td>{selectedUser?.location.city}</td>
					</tr>
					<tr>
						<td>State</td>
						<td>{selectedUser?.location.state}</td>
					</tr>
					<tr>
						<td>Postcode</td>
						<td>{selectedUser?.location.postcode}</td>
					</tr>
					<tr>
						<td>Phone</td>
						<td>{selectedUser?.phone}</td>
					</tr>
					<tr>
						<td>Cell</td>
						<td>{selectedUser?.cell}</td>
					</tr>
				</table>
			</Modal>
		</>
	);
};

export default UserList;
