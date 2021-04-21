import { UserNationality, useUsers } from '../../context/usersContext';
import styles from './FormNationalities.module.scss';

const FormNationalities: React.FC = (): React.ReactElement => {
	const {
		state: { nationalities },
		dispatch,
	} = useUsers();

	const onChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({ type: 'setNationality', payload: value as UserNationality });
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
							checked={nationalities.includes(nat)}
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
