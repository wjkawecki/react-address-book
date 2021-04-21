import { render, screen } from '@testing-library/react';
import FormNationalities from './FormNationalities';

test('renders address book link', () => {
	render(<FormNationalities />);
	const linkElement = screen.getByText(/address book/i);
	expect(linkElement).toBeInTheDocument();
});
