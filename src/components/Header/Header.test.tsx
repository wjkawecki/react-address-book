import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders address book link', () => {
	render(<Header />);
	const linkElement = screen.getByText(/address book/i);
	expect(linkElement).toBeInTheDocument();
});