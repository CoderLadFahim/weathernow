import { useHistory } from "react-router-dom";
import GeolocationPermission from "../components/GeolocationPermission";
import AppLogo from "../components/AppLogo";
import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";

function Opening() {
	const {
		AppData: { localCoords },
		dispatch,
	} = useContext(AppContext);
	const history = useHistory();

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const { latitude, longitude } = position.coords;

				// setting the local coords on the AppContext
				dispatch({
					type: "SET_LOCAL_COORDS",
					payload: { lat: latitude, lon: longitude },
				});

				history.push("/dashboard");
			});
		}
	}, []);

	return (
		<section className="opening h-screen bg-gray-800 text-white font-bold text-font">
			<AppLogo />
			{!localCoords.lat ? <GeolocationPermission /> : <h1> Loading... </h1>}
		</section>
	);
}

export default Opening;
