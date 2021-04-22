import { render, screen } from '@testing-library/react';
import { Nationality, UsersProvider } from '../../context/usersContext';
import UserCard from './UserCard';

test.skip('renders checkbox for each Nationality', () => {
	render(<UserCard />, { wrapper: UsersProvider });
});
