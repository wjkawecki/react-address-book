import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import RoutePaths from '../../routes/paths';
import styles from './Logo.module.scss';

const Logo: React.FC = (): React.ReactElement => {
	return (
		<NavLink className={styles.base} to={RoutePaths.Home}>
			<img src={logo} alt="logo" />
			<span>Back to Home</span>
		</NavLink>
	);
};

export default Logo;
