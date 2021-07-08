import { useContext, useEffect } from "react";
import LocationSearch from "../components/LocationSearch/LocationSearch";
import AppNav from "../components/AppNav";
import { useHistory } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

function Dashboard() {
	const history = useHistory();
	const { AppData, dispatch } = useContext(AppContext);

	const weatherDataURL = (coords) =>
		`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=alerts,minutely&appid=${AppData.apiKey}&units=${AppData.unitSystem}`;

	// redirecting to Opening ('/') if user manually visits '/dashboard' and localcoords haven't been fetched
	navigator.permissions
		.query({ name: "geolocation" })
		.then((permissionStatus) =>
			permissionStatus.state !== "granted" || !AppData.localCoords.lat
				? history.push("/")
				: null
		);

	// fetching the weatherData on first render and everytime user changes the AppData.unitSystem or AppData.activeCoordsForData
	useEffect(() => {
		if (AppData.activeCoordsForData.lat) {
			fetch(weatherDataURL(AppData.activeCoordsForData))
				.then((res) => res.json())
				.then((data) =>
					// dispatching weather data setting action to the AppContext with weather data
					dispatch({
						type: "SET_WEATHER_DATA_TO_SHOW",
						payload: data,
					})
				);
		}
	}, [AppData.unitSystem, AppData.activeCoordsForData]);

	return (
		<section className="bg-gray-800 text-gray-100 h-screen w-screen text-font-light">
			<AppNav />
			{AppData.userSearchingLocation && <LocationSearch />}
			{!AppData.weatherDataToShow ? (
				<h1> Loading... </h1>
			) : (
				JSON.stringify(AppData.weatherDataToShow)
			)}
		</section>
	);
}

export default Dashboard;
