import React from "react";
import "./SearchResults.css";
import TrackList from "../trackList/TrackList";

export default class SearchResults extends React.Component {
	render() {
		return (
			<div className="SearchResults">
				<h2>Results</h2>
				<TrackList
					isRemoval={false}
					onAdd={this.props.onAdd}
					tracks={this.props.searchResults}
				/>
			</div>
		);
	}
}
