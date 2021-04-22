import { render, screen } from '@testing-library/react';
import { UsersProvider } from '../../context/usersContext';
import LoadingIndicator from './LoadingIndicator';

test.skip('renders checkbox for each Nationality', () => {
	render(<LoadingIndicator />, { wrapper: UsersProvider });
});
