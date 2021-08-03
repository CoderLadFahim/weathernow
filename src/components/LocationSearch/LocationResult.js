import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import continents from '../../continents.json';
import countries from '../../countries.json';

function LocationResult({ foundLocation }) {
	const { AppData, dispatch } = useContext(AppContext);

	const locationContinent = (() => {
		for (const continentName in continents) {
			if (continents[continentName].includes(foundLocation.country))
				return continentName;
		}
	})();

	const locationName =
		foundLocation.name + ', ' + countries[foundLocation.country];

	const handleClick = () => {
		const { lat, lon } = foundLocation;

		// setting the active coords to selected location coords
		dispatch({
			type: 'SET_ACTIVE_COORDS',
			payload: { lat, lon },
		});

		// caching the searched location name in AppContext
		dispatch({
			type: 'SET_SEARCHED_LOCATION_NAME',
			payload: locationName,
		});

		// hiding the location searching sidebar as user selected a location to view weather data of
		dispatch({
			type: 'SET_USER_SEARCHING_LOCATION',
			payload: !AppData.userSearchingLocation,
		});
	};

	return (
		<div
			onClick={handleClick}
			className="location-result bg-gray-50 cursor-pointer text-gray-800 rounded-lg mb-2 text-left"
		>
			<h2 className="location-name">
				{foundLocation.name + ', ' + countries[foundLocation.country]},{' '}
				<img
					src={`https://flagcdn.com/16x12/${foundLocation.country.toLowerCase()}.png`}
					className="inline"
					alt=""
				/>
			</h2>

			<h4>
				(
				{foundLocation.lat.toFixed(2) + ', ' + foundLocation.lon.toFixed(2)}
				)
			</h4>

			<h3 className="capitalize">{locationContinent}</h3>
		</div>
	);
}
export default LocationResult;
