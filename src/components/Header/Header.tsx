import logo from '../../assets/logo.svg';
import Navigation from '../Navigation/Navigation';
import styles from './Header.module.scss';

const Header: React.FC = (): React.ReactElement => {
	return (
		<header className={styles.base}>
			<Navigation />
			<img src={logo} alt="logo" />
			<p>
				Edit <code>src/App.tsx</code> and save to reload.
			</p>
			<a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
				Learn React
			</a>
		</header>
	);
};

export default Header;
