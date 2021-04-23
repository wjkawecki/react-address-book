import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import userEvent from '@testing-library/user-event';
import { UsersProvider } from '../../context/usersContext';
import PageHome from '../Home';

const delay = (timeout = 0) => new Promise((r) => setTimeout(r, timeout));

test('renders PageHome', async () => {
	render(
		<MemoryRouter>
			<UsersProvider>
				<PageHome />
			</UsersProvider>
		</MemoryRouter>
	);

	const infoButtonTitle = 'Show user info';
	const findInfoButtons = async () => screen.findAllByTitle(infoButtonTitle);
	let infoButtons: HTMLElement[];

	// initially there are no user displayed
	expect(screen.queryByTitle(infoButtonTitle)).not.toBeInTheDocument();

	// loader div will now get in view and trigger user fetching
	mockAllIsIntersecting(true);
	expect(screen.queryByText(/loading/i)).toBeInTheDocument();

	// wait for the first 50 users to appear on the screen
	infoButtons = await findInfoButtons();
	expect(infoButtons).toHaveLength(50);

	// open Modal of the first user
	infoButtons[0].click();

	// close Modal
	screen.getByTitle('Close modal').click();

	// trigger another user batch (this time pre-fetched)
	mockAllIsIntersecting(false);
	mockAllIsIntersecting(true);

	await waitFor(() => expect(screen.getAllByTitle(infoButtonTitle)).toHaveLength(100));

	// let's verify if search filters out users
	const searchInput = screen.getByRole('textbox');
	userEvent.type(searchInput, 'someimpossiblesearchquery');

	// there should be no visible users
	expect(screen.queryByTitle(infoButtonTitle)).not.toBeInTheDocument();

	// intersecting loader should not trigger fetch this time
	mockAllIsIntersecting(false);
	mockAllIsIntersecting(true);

	// there should still be no visible users
	expect(screen.queryByTitle(infoButtonTitle)).not.toBeInTheDocument();

	// after clearing the search, we should still have 100 users as before
	userEvent.type(searchInput, '{selectall}{del}');

	infoButtons = await findInfoButtons();
	expect(infoButtons).toHaveLength(100);

	// fetch new users until we reach end of users catalog (1000 users)
	// eslint-disable-next-line no-constant-condition
	while (true) {
		mockAllIsIntersecting(false);
		mockAllIsIntersecting(true);
		// eslint-disable-next-line no-await-in-loop
		infoButtons = await findInfoButtons();

		if (infoButtons.length >= 1000) {
			break;
		}
	}

	infoButtons = await findInfoButtons();
	expect(infoButtons).toHaveLength(1000);
}, 30000); // raise timeout for this test, since we have to fetch 1000 users
