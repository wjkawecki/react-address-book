import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UsersProvider } from '../../context/usersContext';
import Search from './Search';

test('renders search input', () => {
	render(<Search />, { wrapper: UsersProvider });

	const input = screen.getByRole('textbox');

	// by default search input should be empty
	expect(input).toHaveAttribute('value', '');

	// let's verify if context handles search onChange correctly
	const value = 'search query';
	userEvent.type(input, value);
	expect(input).toHaveAttribute('value', value);
});
