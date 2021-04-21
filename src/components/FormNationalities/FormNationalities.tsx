import { UserNationality, useUsers } from '../../context/usersContext';
import styles from './FormNationalities.module.scss';

const FormNationalities: React.FC = (): React.ReactElement => {
	const {
		state: { nationalityFilter },
		dispatch,
	} = useUsers();

	const onChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({ type: 'SET_NATIONALITY_FILTER', nationality: value as UserNationality });
	};

	return (
		<form className={styles.base}>
			<fieldset>
				<legend>I want to display users of these nationalities</legend>

				{Object.values(UserNationality).map((nat) => (
					<div key={nat}>
						<input
							id={`nat_${nat}`}
							type="checkbox"
							name="nat"
							value={nat}
							checked={nationalityFilter.includes(nat)}
							onChange={onChange}
						/>
						<label htmlFor={`nat_${nat}`}>{nat}</label>
					</div>
				))}
			</fieldset>
		</form>
	);
};

export default FormNationalities;
