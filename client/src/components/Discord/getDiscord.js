import getCookies from "../../hooks/getCookies";
import { useState } from "react";
const fetchDiscord = async () => {
	await fetch("http://localhost:5001/api/v1/discord", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${getCookies("jwt")}`,
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => {
			console.log(data);
			return data;
		})
		.catch((error) => {
			console.error(
				"There was a problem with the fetch operation:",
				error
			);
		});
};
export default fetchDiscord;
