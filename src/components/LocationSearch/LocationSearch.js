import { useState, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import LocationResult from './LocationResult';

function LocationSearch() {
	const { AppData } = useContext(AppContext);

	const [foundLocations, setFoundLocations] = useState([]);

	const geoCoderURL = (locationToLookFor) =>
		`http://api.openweathermap.org/geo/1.0/direct?q=${locationToLookFor}&limit=${50}&appid=${
			AppData.apiKey
		}`;

	const handleSearchTermChange = async (e) => {
		// executing operations on enter press and truthy search term
		if (e.target.value && e.keyCode === 13) {
			try {
				const requestResponse = await fetch(geoCoderURL(e.target.value));
				const responseData = await requestResponse.json();

				// alerting the user if searched location doesn't exist
				if (responseData.cod === '404' || !responseData[0]) {
					alert(`We couldn't find "${e.target.value}"`);
					e.target.value = '';
				}

				// responseData being set to foundLocations only if data is properly received as an array as the server sends an object if location not found
				if (Array.isArray(responseData)) {
					setFoundLocations((prevLocations) => [
						...prevLocations,
						...responseData,
					]);
				}
			} catch (err) {
				console.log(err);
			}
		}
		// setting the foundLocations array to be empty if user clears search term
		if (e.keyCode === 8) setFoundLocations([]);
	};

	return (
		<section className="location-search w-1/4 bg-green-400 z-10 absolute top-0 bottom-0 right-0 pt-7 shadow text-center">
			<div className="backdrop"></div>
			<input
				type="text"
				className="text-center bg-gray-100 mb-5 text-gray-500 text-font-bold outline-none rounded-xl py-3 w-5/6"
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
