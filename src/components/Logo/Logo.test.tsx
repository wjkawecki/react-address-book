import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Logo from './Logo';

test('renders a11y text', () => {
	render(<Logo />, { wrapper: MemoryRouter });
	const a11yText = screen.getByText(/back to home/i);
	expect(a11yText).toBeInTheDocument();
});
