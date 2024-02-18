import React from "react";
import "../../styles/Dashboard/ContentCard.css";
import { Navigate } from "react-router";

function ContentCard(props) {
	const handleClick = (content) => {
		console.log(content);
		if (content.path) {
			window.location.href = content.path;
		}
	};
	const content = props.content;
	console.log(props.pos);
	if (props.pos === 0) {
		return (
			<div
				className={"content-wrapper wrapper-right"}
				onClick={() => handleClick(content)}
			>
				<div className="content-img">
					<img src={content.img} alt={content.title} />
				</div>
				<div className="content-desc">
					<div className="content-title">{content.title}</div>
					<div className="content-description">
						{content.description}
					</div>
				</div>
			</div>
		);
	} else
		return (
			<div
				className={"content-wrapper wrapper-right"}
				onClick={() => handleClick(content)}
			>
				<div className="content-desc">
					<div className="content-title">{content.title}</div>
					<div className="content-description">
						{content.description}
					</div>
				</div>
				<div className="content-img">
					<img src={content.img} alt={content.title} />
				</div>
			</div>
		);
}

export default ContentCard;
