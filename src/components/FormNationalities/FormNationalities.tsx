import { Nationality, useUsers } from '../../context/usersContext';
import Checkbox from '../Forms/Checkbox/Checkbox';
import styles from './FormNationalities.module.scss';

const FormNationalities: React.FC = (): React.ReactElement => {
	const {
		state: { nationalityFilter },
		dispatch,
	} = useUsers();

	const onChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({ type: 'SET_NATIONALITY_FILTER', nationality: value as Nationality });
	};

	return (
		<form className={styles.base}>
			<fieldset className={styles.fieldset}>
				<legend className={styles.legend}>I want to display users of these nationalities</legend>

				{/* Loop all possible nationalities */}
				{Object.values(Nationality).map((nat) => (
					<Checkbox
						key={nat}
						id={`nat_${nat}`}
						type="checkbox"
						name="nat"
						value={nat}
						checked={nationalityFilter.includes(nat)}
						onChange={onChange}
						label={nat}
					/>
				))}
			</fieldset>
		</form>
	);
};

export default FormNationalities;
