import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UsersProvider } from '../../context/usersContext';
import PageSettings from '../Settings';

test('renders PageSettings', () => {
	const { container } = render(
		<MemoryRouter>
			<UsersProvider>
				<PageSettings />
			</UsersProvider>
		</MemoryRouter>
	);

	expect(container.innerHTML).not.toHaveLength(0);
});
