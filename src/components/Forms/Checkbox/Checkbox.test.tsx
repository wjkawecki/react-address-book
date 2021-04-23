import { render, screen } from '@testing-library/react';
import Checkbox from './Checkbox';

test('renders checkbox element', () => {
	const label = 'Checkbox';
	render(<Checkbox label={label} />);

	expect(screen.getByText(label)).toBeInTheDocument();
});
