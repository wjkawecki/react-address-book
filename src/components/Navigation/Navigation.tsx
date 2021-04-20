import { NavLink } from 'react-router-dom';
import RoutePaths from '../../routes/paths';
import styles from './Navigation.module.scss';

const Navigation: React.FC = (): React.ReactElement => {
	return (
		<nav className={styles.base}>
			<NavLink exact to={RoutePaths.Home}>
				Home
			</NavLink>
			<NavLink to={RoutePaths.Settings}>Settings</NavLink>
		</nav>
	);
};

export default Navigation;
