// In real project this would probably be generated based on an OpenAPI specification.

declare namespace API {
	interface User {
		name: { title: string; first: string; last: string };
		location: {
			street: { number: number; name: string };
			city: string;
			state: string;
			country: string;
			postcode: string | number;
			coordinates: { latitude: string; longitude: string };
			timezone: { offset: string; description: string };
		};
		email: string;
		login: {
			uuid: string;
			username: string;
			password: string;
			salt: string;
			md5: string;
			sha1: string;
			sha256: string;
		};
		phone: string;
		cell: string;
		picture: {
			large: string;
			medium: string;
			thumbnail: string;
		};
		nat: string;
	}

	interface Params {
		inc?: ('email' | 'login' | 'name' | 'nat' | 'picture' | 'location' | 'phone' | 'cell')[];
		nat?: string[];
		page?: number;
		results?: number;
		seed?: string;
	}

	interface Response {
		results: User[];
		info: {
			seed: string;
			results: number;
			page: number;
			version: string;
		};
	}
}
