import LocationSearch from '../components/LocationSearch/LocationSearch';
import AppNav from '../components/AppNav';
import MainDataCard from '../components/MainDataCard';

import TimelyDataToggler from '../components/TimelyDataToggler';
import TimelyDataCard from '../components/TimelyDataCard';

import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

function Dashboard() {
	const history = useHistory();
	const { AppData, dispatch } = useContext(AppContext);

	// getting the toggled timely data type
	let timelyData = null;

	switch (AppData.timelyDataType) {
		case 'daily':
			timelyData = AppData.weatherDataToShow.daily;
			break;
		case 'hourly':
			timelyData = AppData.weatherDataToShow.hourly;
			break;
		case 'minutely':
			timelyData = AppData.weatherDataToShow.minutely;
		default:
			timelyData = null;
	}

	const weatherDataURL = (coords) =>
		`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=alerts&appid=${AppData.apiKey}&units=${AppData.unitSystem}`;

	// redirecting to Opening ('/') if user manually visits '/dashboard' and localcoords haven't been fetched
	navigator.permissions
		.query({ name: 'geolocation' })
		.then((permissionStatus) =>
			permissionStatus.state !== 'granted' || !AppData.localCoords.lat
				? history.push('/')
				: null
		);

	// fetching the weatherData on first render and everytime user changes the AppData.unitSystem or AppData.activeCoordsForData
	useEffect(() => {
		if (AppData.activeCoordsForData.lat) {
			fetch(weatherDataURL(AppData.activeCoordsForData))
				.then((res) => res.json())
				.then((data) =>
					// dispatching weather data setting action to the AppContext with weather data
					dispatch({
						type: 'SET_WEATHER_DATA_TO_SHOW',
						payload: data,
					})
				);
		}
	}, [AppData.unitSystem, AppData.activeCoordsForData]);

	return (
		<section className="bg-gray-800 text-gray-100 h-screen w-screen text-font-light">
			<AppNav />
			{AppData.userSearchingLocation && <LocationSearch />}
			{!AppData.weatherDataToShow ? (
				<h1> Loading... </h1>
			) : (
				<MainDataCard
					locationTimezone={AppData.weatherDataToShow.timezone}
					mainData={AppData.weatherDataToShow.current}
				/>
			)}

			<TimelyDataToggler />

			<div className="timely-data-display">
				{timelyData &&
					timelyData.map((data, i) => (
						<TimelyDataCard timelyWeatherData={data} key={i} />
					))}
			</div>
		</section>
	);
}

export default Dashboard;
