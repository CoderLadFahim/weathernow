import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowLeft,
	faSearch,
	faWeight,
	faBalanceScale,
} from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

function AppNav({ authorContactToggler, dataStatusUpdater }) {
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

	// sending the data is local boolean to dashboard to be sent to MainDataCard
	dataStatusUpdater(weatherDataIsLocal);

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
		<nav className="app-nav shadow-inner md:shadow text-font-bold capitalize bg-gray-700 flex justify-center fixed left-0 right-0 h-12 bottom-0 md:top-0 2xl:h-14 md:w-1/2 xl:3/5 md:rounded-2xl md:overflow-hidden md:left-1/2 md:transform md:-translate-x-1/2 md:mt-3">
			<ul className="w-full h-full flex items-center justify-evenly">
				{/* Local weather toggler */}
				{weatherDataIsLocal === false && (
					<li
						className="nav-item hover:bg-blue-400 hover:text-white text-gray-100"
						onClick={toggleLocalLocationData}
					>
						<FontAwesomeIcon className="mr-2" icon={faArrowLeft} />
						<span className="text-base">Local</span>
					</li>
				)}
				{/* Search Location  */}
				<li
					className="nav-item hover:bg-purple-300 hover:text-gray-100 text-purple-300 flex"
					onClick={toggleLocationSearch}
				>
					<span className="text-base">
						<FontAwesomeIcon className="mr-2" icon={faSearch} />
						Search
					</span>
				</li>
				{/*  Unit System Toggle  */}
				<li
					className={`nav-item  ${
						AppData.unitSystem === 'metric'
							? 'hover:bg-green-400 hover:text-white text-green-400'
							: 'hover:bg-yellow-400 hover:text-white text-yellow-400'
					}`}
					onClick={switchUnitSystem}
				>
					<FontAwesomeIcon
						className="mr-1  text-sm"
						icon={
							AppData.unitSystem === 'metric' ? faWeight : faBalanceScale
						}
					/>
					{AppData.unitSystem}
				</li>{' '}
				{/* Developer Contact */}
				<li
					className="nav-item hover:bg-indigo-400 hover:text-gray-100 text-indigo-300"
					onClick={authorContactToggler}
				>
					Author
				</li>{' '}
			</ul>{' '}
		</nav>
	);
}

export default AppNav;
