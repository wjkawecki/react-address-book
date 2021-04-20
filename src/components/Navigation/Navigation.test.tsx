import { render, screen } from '@testing-library/react';
import Navigation from './Navigation';

test('renders address book link', () => {
	render(<Navigation />);
	const linkElement = screen.getByText(/address book/i);
	expect(linkElement).toBeInTheDocument();
});
