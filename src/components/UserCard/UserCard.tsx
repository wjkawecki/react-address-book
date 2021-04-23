import styles from './UserCard.module.scss';
import info from '../../assets/info.svg';

type UserCardType = {
	user: API.User;
	onClick?: () => void;
};

const UserCard: React.FC<UserCardType> = ({ user, onClick }): React.ReactElement => {
	return (
		<>
			<article className={styles.base}>
				<img className={styles.image} src={user.picture.thumbnail} alt="" loading="lazy" />
				<div className={styles.body}>
					<header className={styles.header}>{`${user.name.first} ${user.name.last}`}</header>
					<p className={styles.username}>{user.login.username}</p>
					<a className={styles.email} href={`mailto:${user.email}`}>
						{user.email}
					</a>
				</div>

				<button type="button" title="Show user info" className={styles.info} onClick={onClick}>
					<img src={info} alt="" />
				</button>
			</article>
		</>
	);
};

export default UserCard;
