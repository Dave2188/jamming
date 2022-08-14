import React from "react";
import "./SearchBar.css";

export default class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.search = this.search.bind(this);
		this.handleTermChange = this.handleTermChange.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}
	handleTermChange(e) {
		document.getElementsByTagName("input").innerHTML = e.target.value;
	}

	handleKeyDown(event) {
		if (event.key === "Enter") {
			this.search();
		}
	}

	search() {
		let term = document.getElementsByTagName("input").innerHTML;
		this.props.onSearch(term);
	}

	render() {
		return (
			<div className="SearchBar">
				<input
					tabIndex={0}
					onKeyDown={this.handleKeyDown}
					onChange={this.handleTermChange}
					type="text"
					placeholder="Enter A Song, Album, or Artist"
				/>
				<button onClick={this.search} className="SearchButton">
					SEARCH
				</button>
			</div>
		);
	}
}
