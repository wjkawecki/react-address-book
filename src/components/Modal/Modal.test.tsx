import { render, screen } from '@testing-library/react';
import { UsersProvider } from '../../context/usersContext';
import Modal from './Modal';

test('renders checkbox for each Nationality', () => {
	render(<Modal isOpen>Modal</Modal>, { wrapper: UsersProvider });

	const children = screen.getByText('Modal');
	expect(children).toBeInTheDocument();
});
