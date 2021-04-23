import { render, screen } from '@testing-library/react';
import LoadingIndicator from './LoadingIndicator';

test('renders LoadingIndicator when fetching', () => {
	render(<LoadingIndicator fetching />);

	expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test('renders nothing when not fetching', () => {
	render(<LoadingIndicator fetching={false} />);

	expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
});
