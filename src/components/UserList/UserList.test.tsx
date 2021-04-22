import { render, screen } from '@testing-library/react';
import { Nationality, UsersProvider } from '../../context/usersContext';
import UserList from './UserList';

test.skip('renders checkbox for each Nationality', () => {
	render(<UserList />, { wrapper: UsersProvider });
});
