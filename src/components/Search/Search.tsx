import { useUsers } from '../../context/usersContext';
import styles from './Search.module.scss';

const Search: React.FC = (): React.ReactElement => {
	const {
		context: {
			state: { search },
			dispatch,
		},
	} = useUsers();

	const onChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({ type: 'SET_SEARCH', search: value });
	};

	return (
		<div className={styles.base}>
			<label htmlFor="search">
				<span>Search</span>
				<input id="search" name="search" value={search} onChange={onChange} />
			</label>
		</div>
	);
};

export default Search;
