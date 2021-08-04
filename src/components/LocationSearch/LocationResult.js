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
			className="location-result bg-gray-50 cursor-pointer text-gray-800 rounded-2xl mb-3 shadow text-left w-11/12 min-h-16 px-4 py-3  flex items-center justify-between relative"
		>
			<div>
				<h2 className="location-name text-blue-400 font-bold pb-1">
					{foundLocation.name + ', ' + countries[foundLocation.country]}{' '}
				</h2>

				<h3 className="capitalize text-sm font-bold text-gray-400">
					{locationContinent}
				</h3>
			</div>

			<h4 className="font-bold text-xs text-gray-300 absolute right-2 bottom-2">
				(
				{foundLocation.lat.toFixed(0) + ', ' + foundLocation.lon.toFixed(0)}
				)
			</h4>
		</div>
	);
}
export default LocationResult;
