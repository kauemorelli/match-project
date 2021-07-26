export const msalConfig = {
	auth: {
		clientId: "24dd6098-7c88-416e-a6f0-e06f0288d777",
		redirectUri: "http://localhost:3000/",
		authority: 'https://login.microsoftonline.com/97e05be6-37b8-44e4-a9d5-4bd3fd6d05fe',
		response_type: 'code',
		response_mode: 'query'
	},
	cache: {
		cacheLocation: "sessionStorage", // This configures where your cache will be stored
		storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
	}
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
	scopes: ["openid","profile","offline_access","user.read"]
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
	graphMeEndpoint: "https://login.microsoftonline.com/97e05be6-37b8-44e4-a9d5-4bd3fd6d05fe/oauth2/v2.0/authorize"
};