import Navbar from "../../components/Navbar.js";
import RotatingScales from "../../components/RotatingScales.js";
function DashboardLawyer() {
	return (
		<>
			<Navbar />
			<RotatingScales />
			<div
				className="dashboardLawyer"
				style={{
					position: "relative",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "90vh",
					width: "100vw",

					// zIndex: "10",
				}}
			>
				<h1>Ahhhh</h1>
			</div>
		</>
	);
}

export default DashboardLawyer;