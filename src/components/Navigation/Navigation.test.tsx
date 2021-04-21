import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RoutePaths from '../../routes/paths';
import Navigation from './Navigation';

test('renders router links', () => {
	render(<Navigation />, { wrapper: MemoryRouter });

	expect(document.querySelector(`a[href="${RoutePaths.Home}"]`)).toBeInTheDocument();
	expect(document.querySelector(`a[href="${RoutePaths.Settings}"]`)).toBeInTheDocument();
});
