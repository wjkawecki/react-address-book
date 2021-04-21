import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

test('renders h1 element', () => {
	render(<Header />, { wrapper: MemoryRouter });
	expect(document.querySelector('h1')).toBeInTheDocument();
});
