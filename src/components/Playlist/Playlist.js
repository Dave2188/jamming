import React from "react";
import "./Playlist.css";
import TrackList from "../trackList/TrackList";

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
				<input
					onChange={this.handleNameChange}
					defaultValue={"Enter Playlist Name"}
				/>
				<TrackList
					isRemoval={true}
					onRemove={this.props.onRemove}
					tracks={this.props.playListTracks}
				/>
				<button onClick={this.props.onSave} className="Playlist-save">
					SAVE TO SPOTIFY
				</button>
			</div>
		);
	}
}
