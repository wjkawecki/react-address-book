import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import { UsersProvider } from './context/usersContext';
import routes from './routes';

const App: React.FC = (): React.ReactElement => {
	return (
		<BrowserRouter>
			<UsersProvider>
				{/* https://a11y-101.com/development/skip-link */}
				<a className="visually-hidden" href="#main">
					Skip to main content
				</a>

				<Header />

				<main id="main">
					<Switch>
						{routes.map(({ exact, path, component, key }) => (
							<Route exact={exact} path={path} component={component} key={key} />
						))}
					</Switch>
				</main>
			</UsersProvider>
		</BrowserRouter>
	);
};

export default App;
