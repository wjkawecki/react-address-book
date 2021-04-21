import FormNationalities from '../components/FormNationalities/FormNationalities';

const PageSettings: React.FC = (): React.ReactElement => {
	return (
		<main>
			<h2>Settings</h2>
			<p>
				You can filter users of selected nationalities. When no filter is set, all users will be
				displayed.
			</p>
			<FormNationalities />
		</main>
	);
};

export default PageSettings;
