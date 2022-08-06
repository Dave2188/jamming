import React from "react";
// import ReactDOM from "react-dom";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import TrackList from "../TrackList/TrackList";
import { toHaveDisplayValue } from "@testing-library/jest-dom/dist/matchers";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.updatePlayListName = this.updatePlayListName.bind(this);
		this.state = {
			searchResults: [
				{ name: "john", artist: "dave", album: "rocket", id: 851 },
				{ name: "john", artist: "dave", album: "rocket", id: 852 },
				{ name: "john", artist: "dave", album: "rocket", id: 853 },
			],

			playListName: "Dave's List",

			playListTracks: [
				{ name: "The mighty Thor", artist: "Thor", album: "Hammer", id: 187 },
				{ name: "The mighty Thor", artist: "Thor", album: "Hammer", id: 188 },
				{ name: "The mighty Thor", artist: "Thor", album: "Hammer", id: 189 },
			],
		};
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

	render() {
		return (
			<div>
				<h1>
					Ja<span className="highlight">mmm</span>ing
				</h1>
				<div className="App">
					<SearchBar />
					<div className="App-playlist">
						<SearchResults
							onAdd={this.addTrack}
							searchResults={this.state.searchResults}
						/>
						<Playlist
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
