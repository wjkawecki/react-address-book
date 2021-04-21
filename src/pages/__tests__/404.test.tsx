import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Page404 from '../404';
import { UsersProvider } from '../../context/usersContext';

test('renders Page404', () => {
	const { container } = render(
		<MemoryRouter>
			<UsersProvider>
				<Page404 />
			</UsersProvider>
		</MemoryRouter>
	);

	expect(container.innerHTML).not.toHaveLength(0);
});
