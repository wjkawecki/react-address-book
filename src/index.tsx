import React from 'react';
import ReactDOM from 'react-dom';
import './styles/globals.scss';
import App from './App';
import 'requestidlecallback-polyfill';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
