import { Link } from 'react-router-dom';
import RoutePaths from '../routes/paths';

const Page404: React.FC = (): React.ReactElement => {
	return (
		<section>
			Not found! Go to <Link to={RoutePaths.Home}>Home</Link>
		</section>
	);
};

export default Page404;
