import { useUsers } from '../../context/usersContext';
import styles from './LoadingIndicator.module.scss';

const LoadingIndicator: React.FC = (): React.ReactElement | null => {
	const {
		context: {
			state: { fetching },
		},
	} = useUsers();

	return fetching ? (
		<div className={styles.base}>
			<span>loading...</span>
		</div>
	) : null;
};

export default LoadingIndicator;
