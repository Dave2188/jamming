import React from "react";
// import ReactDOM from "react-dom";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../utilities/Spotify";
// import TrackList from "../TrackList/TrackList";
// import { toHaveDisplayValue } from "@testing-library/jest-dom/dist/matchers";

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchResults: [],

			playListName: "",

			playListTracks: [],
		};

		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.updatePlayListName = this.updatePlayListName.bind(this);
		this.savePlayList = this.savePlayList.bind(this);
		this.search = this.search.bind(this);
	}

	addTrack(track) {
		// console.log(track);
		if (
			this.state.playListTracks.find((savedTrack) => savedTrack.id === track.id)
		) {
			return;
		} else {
			this.state.playListTracks.push(track);
			this.setState(this.state.playListTracks);
		}
	}

	search(term) {
		Spotify.search(term).then((searchResults) => {
			this.setState({ searchResults: searchResults });
		});
	}

	removeTrack(track) {
		if (
			this.state.playListTracks.find((savedTrack) => savedTrack.id === track.id)
		) {
			let trackToRemove = this.state.playListTracks.indexOf(track);
			this.state.playListTracks.splice(trackToRemove, 1);
			this.setState(this.state.playListTracks);
		} else {
			return;
		}
	}

	updatePlayListName(name) {
		let newPlaylistName = name;
		this.state.playListName = newPlaylistName;
		this.setState({ playListName: name });
	}

	savePlayList() {
		let trackURIs = [];
		this.state.playListTracks.forEach((track) => {
			trackURIs.push(track.uri);
		});
		Spotify.savePlaylist(this.state.playListName, trackURIs).then(() => {
			this.setState({
				playListName: "New Playlist",
				playListTracks: [],
			});
		});
	}

	render() {
		return (
			<div>
				<h1>
					Play<span className="highlight">LIST</span>ify
				</h1>
				<div className="App">
					<SearchBar onSearch={this.search} />
					<div className="App-playlist">
						<SearchResults
							onAdd={this.addTrack}
							searchResults={this.state.searchResults}
						/>
						<Playlist
							onSave={this.savePlayList}
							onNameChange={this.updatePlayListName}
							onRemove={this.removeTrack}
							playListName={this.state.playListName}
							playListTracks={this.state.playListTracks}
						/>
					</div>
				</div>
			</div>
		);
	}
}

// https://open.spotify.com/artist/3rWZHrfrsPBxVy692yAIxF?si=895c62517c154db1
