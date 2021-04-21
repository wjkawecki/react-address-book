import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UsersProvider } from '../../context/usersContext';
import PageHome from '../Home';

test('renders PageHome', () => {
	const { container } = render(
		<MemoryRouter>
			<UsersProvider>
				<PageHome />
			</UsersProvider>
		</MemoryRouter>
	);

	expect(container.innerHTML).not.toHaveLength(0);
});
