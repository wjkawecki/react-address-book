import { render, screen } from '@testing-library/react';
import Modal from './Modal';

test('renders Modal', () => {
	render(<Modal isOpen>Modal</Modal>);

	const children = screen.getByText('Modal');
	expect(children).toBeInTheDocument();
});

test(`renders Modal correctly with appElement`, () => {
	render(
		<div id="#root">
			<Modal isOpen>Modal</Modal>
		</div>
	);

	const children = screen.getByText('Modal');
	expect(children).toBeInTheDocument();
});
