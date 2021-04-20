import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import styles from './Header.module.scss';

const Header: React.FC = (): React.ReactElement => {
	return (
		<header className={styles.base}>
			<Logo />
			<h1>Address Book</h1>
			<Navigation />
		</header>
	);
};

export default Header;
