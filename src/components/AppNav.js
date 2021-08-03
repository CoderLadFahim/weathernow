import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faMapMarkerAlt,
	faSearch,
	faWeight,
	faWeightHanging,
} from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

function AppNav() {
	const { AppData, dispatch } = useContext(AppContext);

	const weatherDataIsLocal = (() => {
		// checking if the localCoords are equal to the apiData coords (then the active data is local)
		if (AppData.weatherDataToShow.lat) {
			const localLat = AppData.localCoords.lat.toFixed(0);
			const localLon = AppData.localCoords.lon.toFixed(0);

			const apiDataLat = AppData.weatherDataToShow.lat.toFixed(0);
			const apiDataLon = AppData.weatherDataToShow.lon.toFixed(0);

			return localLat === apiDataLat && localLon === apiDataLon;
		}

		return null;
	})();

	const toggleLocalLocationData = () => {
		// setting the active weather data coords to localCoords to render local weather data
		dispatch({
			type: 'SET_ACTIVE_COORDS',
			payload: AppData.localCoords,
		});

		// setting the searched location name to an empty string when user toggles local data
		dispatch({
			type: 'SET_SEARCHED_LOCATION_NAME',
			payload: '',
		});
	};

	const switchUnitSystem = () =>
		// switching the unit system on the application context
		dispatch({
			type: 'SET_UNIT_SYSTEM',
			payload: AppData.unitSystem === 'metric' ? 'imperial' : 'metric',
		});

	const toggleLocationSearch = () =>
		// setting the location searching state property on the AppContext to true (toggling the location searching sidebar)
		dispatch({
			type: 'SET_USER_SEARCHING_LOCATION',
			payload: !AppData.userSearchingLocation,
		});

	return (
		<nav className="app-nav text-font-bold capitalize bg-gray-700 flex items-center content-evenly h-14">
			<ul className="w-full h-full flex items-center justify-around">
				<li
					className={`nav-item ${weatherDataIsLocal ? 'active' : ''}`}
					onClick={toggleLocalLocationData}
				>
					<FontAwesomeIcon className="mr-2" icon={faMapMarkerAlt} />
					Local
				</li>
				<li className="nav-item border-none" onClick={toggleLocationSearch}>
					<FontAwesomeIcon className="mr-2" icon={faSearch} />
					Search Location
				</li>
				<li
					className={`nav-item ${
						AppData.unitSystem === 'metric'
							? 'text-green-400 border-green-600'
							: 'text-yellow-400 border-yellow-600'
					}`}
					onClick={switchUnitSystem}
				>
					<FontAwesomeIcon
						className="mr-2"
						icon={
							AppData.unitSystem === 'metric'
								? faWeight
								: faWeightHanging
						}
					/>
					{AppData.unitSystem}
				</li>{' '}
			</ul>{' '}
		</nav>
	);
}

export default AppNav;
