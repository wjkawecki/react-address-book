import { render, screen } from '@testing-library/react';
import { Nationality, UsersProvider } from '../../context/usersContext';
import FormNationalities from './FormNationalities';

test('renders checkbox for each Nationality', () => {
	render(<FormNationalities />, { wrapper: UsersProvider });

	Object.values(Nationality).forEach((nationality) => {
		const checkbox = screen.getByDisplayValue(nationality) as HTMLInputElement;
		expect(checkbox).toBeInTheDocument();

		// by default each checkbox should be checked
		expect(checkbox.checked).toEqual(true);

		// let's verify if context handles onChange correctly
		checkbox.click();
		expect(checkbox.checked).toEqual(false);

		checkbox.click();
		expect(checkbox.checked).toEqual(true);
	});
});
