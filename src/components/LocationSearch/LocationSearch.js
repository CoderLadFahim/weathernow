import { useState, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import LocationResult from "./LocationResult";

function LocationSearch() {
	const { AppData, dispatch } = useContext(AppContext);

	const [foundLocations, setFoundLocations] = useState([]);

	const geoCoderURL = (locationToLookFor) =>
		`http://api.openweathermap.org/geo/1.0/direct?q=${locationToLookFor}&limit=${50}&appid=${
			AppData.apiKey
		}`;

	const handleSearchTermChange = async (e) => {
		if (e.target.value && e.keyCode === 13) {
			try {
				const requestResponse = await fetch(geoCoderURL(e.target.value));
				const responseData = await requestResponse.json();

				if (Array.isArray(responseData)) {
					setFoundLocations((prevLocations) => [
						...prevLocations,
						...responseData,
					]);
				}
			} catch (e) {
				console.log(e);
			}
		}

		if (e.keyCode === 8) setFoundLocations([]);
	};

	return (
		<section className="location-search bg-green-400">
			<input
				type="text"
				className="text-center text-gray-500 text-font-bold outline-none rounded-lg py-1"
				onKeyUp={handleSearchTermChange}
				placeholder="Search Location"
			/>
			{foundLocations.map((location, i) => (
				<LocationResult key={i} foundLocation={location} />
			))}
		</section>
	);
}

export default LocationSearch;
