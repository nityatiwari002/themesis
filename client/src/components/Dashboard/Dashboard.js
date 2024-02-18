import ImageSlider from "./ImageSlider.js";
import Navbar from "../Navbar.js";
import RotatingScales from "../RotatingScales.js";
import { AuthData } from "../../services/AuthService.js";
import content from "./DashboardContent.js";
import ContentCard from "./ContentCard.js";
function Dashboard() {
	const { user } = AuthData();
	return (
		<>
			<Navbar home={true} />
			{/* <RotatingScales /> */}
			<div
				className="dashboardLawyer"
				style={{
					position: "relative",
					// display: "flex",
					display: "block",
					// flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					height: "90vh",
					width: "100%",
					overflow: "scroll",
					// backgroundColor: "white",
					// zIndex: "10",
				}}
			>
				{/* <ImageSlider /> */}
				{content.map((cont, index) => {
					return (
						<ContentCard
							content={cont}
							pos={index % 2}
							key={index}
							index={index}
						/>
					);
				})}
			</div>
		</>
	);
}

export default Dashboard;
