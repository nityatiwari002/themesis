import { createContext, useContext, useState } from "react";
import Navbar from "../components/Navbar";
import RenderRoutes from "../routes/RenderRoutes";
import Chatbot from "../components/Chatbot";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
	const [user, setUser] = useState({ name: "", isAuthenticated: false });
	console.log(AuthContext);
	const login = (userName, password) => {
		return new Promise((resolve, reject) => {
			if (password === "password") {
				setUser({ name: userName, isAuthenticated: true });
				resolve("success");
			} else {
				reject("Incorrect password");
			}
		});
	};
	const logout = () => {
		setUser({ ...user, isAuthenticated: false });
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			<>
				<Navbar />
				<RenderRoutes />
				<Chatbot />
			</>
		</AuthContext.Provider>
	);
};
