import Page404 from '../pages/404';
import PageHome from '../pages/Home';
import PageSettings from '../pages/Settings';
import RoutePaths from './paths';

export default [
	{
		key: 'Home',
		path: RoutePaths.Home,
		exact: true,
		component: PageHome,
	},
	{
		key: 'Settings',
		path: RoutePaths.Settings,
		component: PageSettings,
	},
	{ key: '404', component: Page404 },
];
