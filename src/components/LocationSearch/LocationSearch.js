import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { useState, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import LocationResult from './LocationResult';

function LocationSearch() {
	const { AppData, dispatch } = useContext(AppContext);
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

	const hideSearchMenu = () =>
		dispatch({
			type: 'SET_USER_SEARCHING_LOCATION',
			payload: !AppData.userSearchingLocation,
		});

	return (
		<section className="location-search w-4/5 bg-green-400 z-10 absolute top-0 bottom-0 right-0 pt-7 shadow text-center sm:w-3/5 lg:w-2/6">
			<div className="backdrop"></div>

			<input
				type="text"
				className="text-center bg-gray-100 mb-9 text-gray-500 text-lg text-font-bold outline-none rounded-xl py-3 w-5/6 shadow"
				onKeyUp={handleSearchTermChange}
				placeholder="Search Location"
			/>

			<h6 className="font-bold text-sm mb-2">Results</h6>
			{foundLocations.map((location, i) => (
				<LocationResult key={i} foundLocation={location} />
			))}

			<FontAwesomeIcon
				className="absolute text-green-200 cursor-pointer bottom-4 right-5 transform scale-150 hover:text-white"
				onClick={hideSearchMenu}
				icon={faTimes}
			/>
		</section>
	);
}

export default LocationSearch;
