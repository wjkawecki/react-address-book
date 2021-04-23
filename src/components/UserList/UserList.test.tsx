import { render, screen } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { UsersProvider } from '../../context/usersContext';
import UserList from './UserList';

test('renders UserList correctly', async () => {
	render(<UserList />, { wrapper: UsersProvider });

	// initially we render nothing
	expect(screen.queryByText(/./)).toBeFalsy();

	// loader div will now get in view and trigger user fetching
	mockAllIsIntersecting(true);
	expect(screen.queryByText(/loading/i)).toBeInTheDocument();

	// wait for the first 50 users to appear on the screen
	const userInfoButtons = await screen.findAllByTitle('Show user info');
	expect(userInfoButtons).toHaveLength(50);

	// open Modal of the first user
	userInfoButtons[0].click();

	// close Modal
	screen.getByTitle('Close modal').click();

	mockAllIsIntersecting(false);

	mockAllIsIntersecting(true);

	expect(await screen.findAllByTitle('Show user info')).toHaveLength(100);
});
