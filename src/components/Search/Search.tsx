import styles from './Search.module.scss';

const Search: React.FC = (): React.ReactElement => {
	return (
		<div className={styles.base}>
			Search
			<input />
		</div>
	);
};

export default Search;
