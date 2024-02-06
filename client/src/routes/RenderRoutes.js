import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthData } from "../services/AuthService";
import routes from "./Routes";
import Dashboard from "../pages/UserPages/Dashboard";
import Home from "../pages/Account/Home";

const RenderRoutes = () => {
	const { user } = AuthData();

	return (
		<Routes>
			<Route
				index={true}
				path="/"
				element={user.isAuthenticated ? <Dashboard /> : <Home />}
			/>
			{routes.map((r, i) => {
				if (r.isPrivate && user.isAuthenticated) {
					return (
						<Route key={i} path={r.path} element={r.component} />
					);
				} else if (!r.isPrivate) {
					return (
						<Route key={i} path={r.path} element={r.component} />
					);
				} else if (r.isUtility) {
					return (
						<Route key={i} path={r.path} element={r.component} />
					);
				} else return null;
			})}
		</Routes>
	);
};
export default RenderRoutes;
