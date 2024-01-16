import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import RenderRoutes from "../routes/RenderRoutes";
import ChatIcon from "../components/ChatIcon";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState({ name: "", isAuthenticated: false });
	console.log(AuthContext);
	const login = async (email, password) => {

		let userData = {
			email: email,
			password: password,
		}

try{
		const response = await fetch('http://localhost:5001/api/v1/users/login',{
			method : 'post',
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(userData)
		}).then(response => response.json()).then(data => {
			console.log("data", data);
			return new Promise((resolve, reject) => {
				if (data) {
					setUser({ name: email, isAuthenticated: true });
					navigate("/dashboard");
					resolve("success");
				} else {
					reject("Wrong Credentails!!");
				}
			})
		})}catch(err){
			alert('Wrong Credentials!!');
		}
	}


	const logout = () => {
		setUser({ ...user, isAuthenticated: false });
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			<>
				<Navbar />
				<RenderRoutes />
				{user.isAuthenticated && <ChatIcon />}
			</>
		</AuthContext.Provider>
	);
};


	
	// async function handleSubmit (event){ 
	// 	event.preventDefault();

	//    let userData = {
	// 		email: email,
	// 		password: password
	// 	}

	// 	let response = await fetch('http://localhost:5001/api/v1/users/login',{
	// 		method : 'post',
	// 		headers:{
	// 			"Content-Type":"application/json"
	// 		},
	// 		body:JSON.stringify(userData)
	// 	});

	// 	response = response.json();
	// 	localStorage.setItem("user-info", JSON.stringify(response));
	// 	navigate("/dashboard");
	// }
