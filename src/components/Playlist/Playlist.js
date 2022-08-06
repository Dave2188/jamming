import React from "react";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList";

export default class Playlist extends React.Component {
	constructor(props) {
		super(props);
		this.handleNameChange = this.handleNameChange.bind(this);
	}

	handleNameChange(e) {
		let newName = e.target.value;
		this.props.onNameChange(newName);
	}

	render() {
		return (
			<div className="Playlist">
				<input onChange={this.handleNameChange} defaultValue={"New Playlist"} />
				<TrackList
					isRemoval={true}
					onRemove={this.props.onRemove}
					tracks={this.props.playListTracks}
				/>
				<button className="Playlist-save">SAVE TO SPOTIFY</button>
			</div>
		);
	}
}
