/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import 'react-intersection-observer/test-utils';
import 'requestidlecallback-polyfill';
import { enableFetchMocks } from 'jest-fetch-mock';
import apiMockResponse from './utils/apiMockResponse';

enableFetchMocks();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(fetch as any).mockResponse(
	// we will throttle mock fetches by 100ms to better represent real API requests
	() =>
		new Promise((resolve) =>
			setTimeout(() => {
				// Math.random() generates unique keys for our repeatedly used mocked data set
				return resolve(JSON.stringify(apiMockResponse(Math.random())));
			}, 100)
		)
);
