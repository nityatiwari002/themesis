import React from "react";

function ProfileImg({ person }) {
	return (
		<>
			<img src={person.image} className="lawyer-image"></img>
		</>
	);
}

export default ProfileImg;
