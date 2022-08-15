let userToken;
let expirationTime;
const clientId = "c7a5e1594c8b40a49a137d4cf40571d1";
const redirectUri = "http://Play-list-ify.surge.sh";

const Spotify = {
	getAccessToken() {
		if (userToken) {
			return userToken;
		}

		let userTokenMatch = window.location.href.match(/access_token=([^&]*)/);
		let expirationTimeMatch = window.location.href.match(/expires_in=([^&]*)/);

		if (userTokenMatch && expirationTimeMatch) {
			userToken = userTokenMatch[1];
			expirationTime = expirationTimeMatch[1];

			window.setTimeout(() => (userToken = ""), expirationTime * 1000);
			window.history.pushState("userToken", null, "/");
			return userToken;
		} else {
			const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
			window.location = accessUrl;
		}
	},

	search(term) {
		console.log(term);
		const userToken = Spotify.getAccessToken();

		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
			headers: {
				Authorization: `Bearer ${userToken}`,
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((jsonResponse) => {
				if (!jsonResponse.tracks) {
					return [];
				}
				console.log(jsonResponse.tracks.items);
				return jsonResponse.tracks.items.map((track) => ({
					id: track.id,
					name: track.name,
					artist: track.artists[0].name,
					album: track.album.name,
					albumImage: track.album.images[2],
					uri: track.uri,
				}));
			});
	},

	savePlaylist(name, trackUris) {
		if (!name || !trackUris) {
			return;
		}

		const accessToken = Spotify.getAccessToken();
		const headers = { Authorization: `Bearer ${accessToken}` };
		let userId;

		return fetch(`https://api.spotify.com/v1/me`, { headers: headers })
			.then((response) => response.json())
			.then((jsonResponse) => {
				userId = jsonResponse.id;
				return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
					headers: headers,
					method: "POST",
					body: JSON.stringify({ name: name }),
				})
					.then((response) => response.json())
					.then((jsonResponse) => {
						const playlistId = jsonResponse.id;
						return fetch(
							`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
							{
								headers: headers,
								method: "PUT",
								body: JSON.stringify({ uris: trackUris }),
							}
						);
					});
			});
	},
};

export default Spotify;
