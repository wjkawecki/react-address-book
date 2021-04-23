import { render, screen } from '@testing-library/react';
import UserCard from './UserCard';

const mockUser = {
	name: {
		title: 'Mr',
		first: 'Richard',
		last: 'Crawford',
	},
	location: {
		street: {
			number: 5309,
			name: 'Victoria Street',
		},
		city: 'Aberdeen',
		state: 'Humberside',
		country: 'United Kingdom',
		postcode: 'I65 7ER',
		coordinates: {
			latitude: '61.2253',
			longitude: '-47.0391',
		},
		timezone: {
			offset: '-10:00',
			description: 'Hawaii',
		},
	},
	email: 'richard.crawford@example.com',
	login: {
		uuid: 'c218e080-4a73-44e3-8858-be9269611b7a',
		username: 'greenlion774',
		password: 'koolaid',
		salt: 'qPDlq4mV',
		md5: '5a3e1a90b74658aa3e7d40f89dfdafa7',
		sha1: 'ce8afab915351ee3ac32a20433529a46463435fc',
		sha256: 'b84d460bfdcaee4c1f4424df309d0290ba63a5f0ffb860b75817b983c57c7269',
	},
	phone: '015394 63690',
	cell: '0710-844-587',
	picture: {
		large: 'https://randomuser.me/api/portraits/men/18.jpg',
		medium: 'https://randomuser.me/api/portraits/med/men/18.jpg',
		thumbnail: 'https://randomuser.me/api/portraits/thumb/men/18.jpg',
	},
	nat: 'GB',
};

test('renders UserCard', () => {
	render(<UserCard user={mockUser} />);

	const name = screen.getByText(/Richard Crawford/i);
	expect(name).toBeInTheDocument();
});
