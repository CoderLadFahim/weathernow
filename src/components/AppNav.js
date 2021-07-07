import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

function AppNav() {
	const { AppData, dispatch } = useContext(AppContext);

	const weatherDataIsLocal = (() => {
		if (AppData.weatherDataToShow.lat) {
			const localLat = AppData.localCoords.lat.toFixed(0);
			const localLon = AppData.localCoords.lon.toFixed(0);

			const apiDataLat = AppData.weatherDataToShow.lat.toFixed(0);
			const apiDataLon = AppData.weatherDataToShow.lon.toFixed(0);

			return localLat === apiDataLat && localLon === apiDataLon;
		}

		return null;
	})();

	const switchUnitSystem = () =>
		// switching the unit system on the application context
		dispatch({
			type: "SET_UNIT_SYSTEM",
			payload: AppData.unitSystem === "metric" ? "imperial" : "metric",
		});

	const toggleLocationSearch = () =>
		// setting the location searching state property on the AppContext to true (toggling the location searching sidebar)
		dispatch({
			type: "SET_USER_SEARCHING_LOCATION",
			payload: !AppData.userSearchingLocation,
		});

	return (
		<nav className="app-nav bg-gray-700 flex items-center content-evenly h-12">
			<ul className="w-full h-full flex items-center justify-around border">
				<li
					className={`bg-gray-800 p-2 rounded-2xl ${
						weatherDataIsLocal ? "active" : ""
					}`}
				>
					<FontAwesomeIcon icon={faMapMarkerAlt} />
					Local
				</li>
				<li onClick={toggleLocationSearch}>Search Location</li>
				<li onClick={switchUnitSystem}>{AppData.unitSystem}</li>{" "}
			</ul>{" "}
		</nav>
	);
}

export default AppNav;
