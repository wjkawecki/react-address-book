import Search from '../components/Search/Search';
import UserList from '../components/UserList/UserList';

const PageHome: React.FC = (): React.ReactElement => {
	return (
		<section>
			<Search />
			<UserList />
		</section>
	);
};

export default PageHome;
