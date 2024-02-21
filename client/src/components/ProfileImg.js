import React from "react";

function ProfileImg({ person }) {
	return (
		<>
			<img
				src={`http://localhost:5001/uploads/${person.image}`}
				className="lawyer-image"
			></img>
		</>
	);
}

export default ProfileImg;
