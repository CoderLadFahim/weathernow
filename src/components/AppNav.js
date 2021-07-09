import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

function AppNav() {
	const { AppData, dispatch } = useContext(AppContext);

	const weatherDataIsLocal = (() => {
		// checking if the localCoords are equal to the apiData coords (then the active data is local)
		if (AppData.weatherDataToShow.lat) {
			const localLat = AppData.localCoords.lat.toFixed(0);
			const localLon = AppData.localCoords.lon.toFixed(0);

			const apiDataLat = AppData.weatherDataToShow.lat.toFixed(0);
			const apiDataLon = AppData.weatherDataToShow.lon.toFixed(0);

			return localLat === apiDataLat && localLon === apiDataLon;
		}

		return null;
	})();

	const toggleLocalLocationData = () => {
		// setting the active weather data coords to localCoords to render local weather data
		dispatch({
			type: "SET_ACTIVE_COORDS",
			payload: AppData.localCoords,
		});
	};

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
		<nav className="app-nav text-font-bold capitalize bg-gray-700 flex items-center content-evenly h-12">
			<ul className="w-full h-full flex items-center justify-around">
				<li
					className={`bg-gray-800 cursor-pointer  p-2 rounded-2xl ${
						weatherDataIsLocal ? "active" : ""
					}`}
					onClick={toggleLocalLocationData}
				>
					<FontAwesomeIcon icon={faMapMarkerAlt} />
					Local
				</li>
				<li className="cursor-pointer" onClick={toggleLocationSearch}>
					<FontAwesomeIcon icon={faSearch} />
					Search Location
				</li>
				<li
					className={`text-${
						AppData.unitSystem === "metric" ? "green" : "yellow"
					}-400 cursor-pointer`}
					onClick={switchUnitSystem}
				>
					{AppData.unitSystem}
				</li>{" "}
			</ul>{" "}
		</nav>
	);
}

export default AppNav;
