import { render, screen } from '@testing-library/react';
import Logo from './Logo';

test('renders address book link', () => {
	render(<Logo />);
	const linkElement = screen.getByText(/address book/i);
	expect(linkElement).toBeInTheDocument();
});
