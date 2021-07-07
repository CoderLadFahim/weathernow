import { useState, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import LocationResult from "./LocationResult";

function LocationSearch() {
	const { AppData, dispatch } = useContext(AppContext);

	const [foundLocations, setFoundLocations] = useState([]);

	const geoCoderURL = (locationToLookFor) =>
		`http://api.openweathermap.org/geo/1.0/direct?q=${locationToLookFor}&limit=${1}&appid=${
			AppData.apiKey
		}`;

	const handleSearchTermChange = async (e) => {
		if (e.target.value) {
			const requestResponse = await fetch(geoCoderURL(e.target.value));
			const responseData = await requestResponse.json();

			setFoundLocations((prevLocations) => [
				...prevLocations,
				...responseData,
			]);
		}
	};

	const debounce = (func, timeout = 1000) => {
		let timer;
		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				func.apply(this, args);
			}, timeout);
		};
	};

	return (
		<section className="location-search bg-green-400">
			<input
				type="text"
				className="text-center text-gray-500 text-font-bold outline-none rounded-lg py-1"
				onChange={debounce(handleSearchTermChange)}
				placeholder="Search Location"
			/>

			<LocationResult />
		</section>
	);
}

export default LocationSearch;
