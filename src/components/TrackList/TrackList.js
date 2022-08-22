import React from "react";
import "./TrackList.css";
import Track from "../track/Track";

export default class TrackList extends React.Component {
	render() {
		return (
			<div className="TrackList">
				{this.props.tracks.map((track) => (
					<Track
						isRemoval={this.props.isRemoval}
						onRemove={this.props.onRemove}
						onAdd={this.props.onAdd}
						key={track.id}
						track={track}
					/>
				))}
			</div>
		);
	}
}

// this.props.tracks.map((track) => {return <Track key={track.id} track={track} />;})
// with braces arrows can have multi statements and with parentheses can have only one!
