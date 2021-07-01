import { useHistory } from "react-router-dom";
import { useContext } from "react";
import LocationInput from "../components/LocationInput";
import { WeatherContext } from "../contexts/WeatherContext";
import AppNav from "../components/AppNav";

function Dashboard() {
	const history = useHistory();
	const weatherData = useContext(WeatherContext);

	// redirecting to Opening ('/') if user manually visits '/dashboard' and localcoords haven't been fetched
	navigator.permissions
		.query({ name: "geolocation" })
		.then((permissionStatus) => {
			const { state } = permissionStatus;

			if (state !== "granted") history.push("/");
		});

	return (
		<section>
			<LocationInput />
			{JSON.stringify(weatherData)}
			<AppNav />
		</section>
	);
}

export default Dashboard;
