import styles from './UserCard.module.scss';

type UserCardType = {
	user: API.User;
};

const UserCard: React.FC<UserCardType> = ({ user }): React.ReactElement => {
	return (
		<article className={styles.base}>
			<img className={styles.image} src={user.picture.thumbnail} alt="" loading="lazy" />
			<div className={styles.body}>
				<header className={styles.header}>{`${user.name.first} ${user.name.last}`}</header>
				<p className={styles.username}>{user.login.username}</p>
				<a className={styles.email} href={`mailto:${user.email}`}>
					{user.email}
				</a>
			</div>
		</article>
	);
};

export default UserCard;
