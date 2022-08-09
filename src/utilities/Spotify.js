let userToken;
let expirationTime;
const clientId = c7a5e1594c8b40a49a137d4cf40571d1;
const redirectUri = "http://localhost:3000/";

const Spotify = {
	getAccessToken() {
		if (!userToken === undefined) {
			return this.userToken;
		}
		if (userToken === undefined) {
			let url = new url(window.location.href);
			let hashString = url.hash;
			userToken = hashString.searchParams.get("access_token");
			expirationTime = hashString.searchParams.get("expires_in");
			setTimeout(() => {
				userToken = "";
				url = url.split("#")[0];
			}, expirationTime);
		}
	},
};

export { Spotify };
