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
			return;
		}
		if (userToken === undefined) {
			window.location.replace(
				`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
			);
		}
	},

	search(term) {
		const params = {
			headers: { Authorization: `Bearer ${userToken}` },
			method: "GET",
		};

		fetch("https://api.spotify.com/v1/search?type=track&q=TERM", params)
			.then((response) => response.json())
			.then(JSON.parse(response.json));
		response.map();
	},
};

export { Spotify };
