import { render, screen } from '@testing-library/react';
import { UserNationality, UsersProvider } from '../../context/usersContext';
import FormNationalities from './FormNationalities';

test('renders checkbox for each UserNationality', () => {
	render(<FormNationalities />, { wrapper: UsersProvider });

	Object.values(UserNationality).forEach((nationality) => {
		const checkbox = screen.getByDisplayValue(nationality) as HTMLInputElement;
		expect(checkbox).toBeInTheDocument();
		expect(checkbox.checked).toEqual(false);

		checkbox.click();
		expect(checkbox.checked).toEqual(true);

		checkbox.click();
		expect(checkbox.checked).toEqual(false);
	});
});
