import React from "react";
import "./Track.css";

export default class Track extends React.Component {
	renderAction() {
		let isRemoval = this.props.isRemoval;
		let symbol = isRemoval ? "-" : "+";
		console.log(isRemoval);
		return <button className="Track-action">{symbol}</button>;
	}

	addTrack(e) {
		let add = e.target.className;
	}

	render() {
		return (
			<div className="Track">
				<div className="Track-information">
					<h3>{this.props.track.name}</h3>
					<p>
						{this.props.track.artist} | {this.props.track.album}
					</p>
				</div>
				{this.renderAction()}
			</div>
		);
	}
}
