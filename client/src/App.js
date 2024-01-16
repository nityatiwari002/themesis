import React, {useEffect, useState} from "react";
import Axios from 'axios';
import "./styles/App.css";
import { AuthWrapper } from "./services/AuthService";

function App() {
	const [data, setData] = useState("");

	const getData = async() => {
		const response = await Axios.get("http://localhost:5001/api/v1/users/me/65a21a3b524058ab467f4d7d");
		setData(response.data);
	}

	useEffect(() => {
		getData()
	},[]);
	return (
		<div className="App">
			<AuthWrapper />
			{/* {data} */}
		</div>
	);
}

export default App;
