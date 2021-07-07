import { useState, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import LocationResult from "./LocationResult";

function LocationSearch() {
	const { AppData, dispatch } = useContext(AppContext);

	const geoCoderURL = (locationToLookFor) =>
		`http://api.openweathermap.org/geo/1.0/direct?q=${locationToLookFor}&limit=${1}&appid=${
			AppData.apiKey
		}`;

	const [locationSearchTerm, setLocationSearchTerm] = useState("");

	const handleSearchTermChange = (e) => {
		setLocationSearchTerm(e.target.value);
	};

	return (
		<section className="location-search bg-green-400">
			<input
				type="text"
				value={locationSearchTerm}
				onChange={handleSearchTermChange}
				placeholder="Search Location"
			/>

			<LocationResult />
		</section>
	);
}

export default LocationSearch;
