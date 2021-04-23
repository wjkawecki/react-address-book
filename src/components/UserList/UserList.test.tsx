import { render, screen } from '@testing-library/react';
import { UsersProvider } from '../../context/usersContext';
import UserList from './UserList';

test('renders UserList correctly', async () => {
	render(<UserList />, { wrapper: UsersProvider });

	// initially we render nothing
	expect(screen.queryByText(/./)).toBeFalsy();
});
