import { render, screen } from '@testing-library/react';
import Search from './Search';

test('renders address book link', () => {
	render(<Search />);
	const linkElement = screen.getByText(/address book/i);
	expect(linkElement).toBeInTheDocument();
});
