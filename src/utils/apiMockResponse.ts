export default function apiMockResponse(key: number): API.Response {
	return {
		results: Array.from({ length: 50 }, (_, i) => ({
			// name.first+name.last are used for search, they better be unique
			name: { title: 'Miss', first: 'Valentina', last: `${key}-${i}` },
			location: {
				street: { number: 4977, name: 'Rue de Bonnel' },
				city: 'Vitry-sur-Seine',
				state: 'Pyrénées-Atlantiques',
				country: 'France',
				postcode: 39753,
				coordinates: { latitude: '55.4653', longitude: '81.5865' },
				timezone: { offset: '-3:30', description: 'Newfoundland' },
			},
			email: 'valentina.muller@example.com',
			login: {
				// uuid is used as key in .map() looping, so it has to be unique
				uuid: `${key}-${i}`,
				username: 'brownmeercat719',
				password: 'dirty1',
				salt: 'jHLyUkNq',
				md5: '03ba404e9415c5d6ec8553548fcf5a86',
				sha1: 'e4525f18d694313baa3822990ea772b1635b8b7d',
				sha256: '17269aeff9e545834488e2761e8a7254fc8837574b7e89e26bc3ae369a0c2b1f',
			},
			phone: '05-90-41-24-08',
			cell: '06-95-42-40-67',
			picture: {
				large: 'https://randomuser.me/api/portraits/women/71.jpg',
				medium: 'https://randomuser.me/api/portraits/med/women/71.jpg',
				thumbnail: 'https://randomuser.me/api/portraits/thumb/women/71.jpg',
			},
			nat: 'FR',
		})),
		info: { seed: 'bfc5bffa6baa4a6c', results: 50, page: 1, version: '1.3' },
	};
}
