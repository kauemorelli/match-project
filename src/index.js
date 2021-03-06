import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import storeConfig from './store/storeConfig';

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";

const store = storeConfig();

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<MsalProvider instance={msalInstance}>
				<App />
			</MsalProvider>
		</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
