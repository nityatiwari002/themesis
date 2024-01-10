import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import routes from "./routes/Routes";
import nativeRoutes from "./routes/NativeRoutes";
import ForgotPw from "./pages/ForgotPw";

function App() {
	const [loggedin, setLoggedin] = useState(false);
	const routing = loggedin ? routes : nativeRoutes;
	return (
		<div className="App">
			<Navbar
				loggedin={loggedin}
				routing={loggedin ? routes : nativeRoutes}
			/>

			<Routes>
				{routing.map((route, index) => {
					return (
						<Route
							key={index}
							path={route.path}
							element={route.component}
							setLogin={setLoggedin}
						/>
					);
				})}
				<Route path="/forgot-password" element={<ForgotPw />} />
			</Routes>
		</div>
	);
}

export default App;
