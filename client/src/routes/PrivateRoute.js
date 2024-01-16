import React from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";

const PrivateRoute = ({ render: Component, ...rest }) => {
	const navigate = useNavigate();
	const isAuthenticated = localStorage.getItem("token");
	if (!isAuthenticated) {
		navigate("/login");
	}
	return (
		<Route
			{...rest}
			render={(props) => {
				isAuthenticated ? (
					<Component {...props} />
				) : (
					<Navigate to="/login" />
				);
			}}
		/>
	);
};

export default PrivateRoute;
