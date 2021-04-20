import { NavLink } from 'react-router-dom';
import RoutePaths from '../../routes/paths';
import styles from './Navigation.module.scss';

const Navigation: React.FC = (): React.ReactElement => {
	return (
		<nav className={styles.base}>
			<ul>
				<li>
					<NavLink exact to={RoutePaths.Home}>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink to={RoutePaths.Settings}>Settings</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
