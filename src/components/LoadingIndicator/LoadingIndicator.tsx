import styles from './LoadingIndicator.module.scss';

interface LoadingIndicatorProps {
	fetching: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
	fetching,
}): React.ReactElement | null => {
	return fetching ? (
		<div className={styles.base}>
			<span>loading...</span>
		</div>
	) : null;
};

export default LoadingIndicator;
