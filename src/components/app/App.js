import React from "react";
// import ReactDOM from "react-dom";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: [
				{ name: "john", artist: "dave", album: "rocket", id: 851 },
				{ name: "john", artist: "dave", album: "rocket", id: 852 },
				{ name: "john", artist: "dave", album: "rocket", id: 853 },
			],

			playListName: "Dave's List",

			playListTracks: [
				{ name: "The mighty Thor", artist: "Thor", album: "Hammer", id: "187" },
				{ name: "The mighty Thor", artist: "Thor", album: "Hammer", id: "188" },
				{ name: "The mighty Thor", artist: "Thor", album: "Hammer", id: "189" },
			],
		};
	}

	addTrack = this.addTrack.bind(this);

	addTrack(track) {
		track.id ===
		this.state.playListTracks.map((playListTrack) => playListTrack.id)
			? alert("This song is already on the playlist")
			: this.setState(this.state.playListTracks.push(track));
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
							playListName={this.state.playListName}
							playListTracks={this.state.playListTracks}
						/>
					</div>
				</div>
			</div>
		);
	}
}
