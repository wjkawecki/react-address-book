import { render, screen } from '@testing-library/react';
import { UserNationality, UsersProvider } from '../../context/usersContext';
import UserList from './UserList';

test.skip('renders checkbox for each UserNationality', () => {
	render(<UserList />, { wrapper: UsersProvider });
});
