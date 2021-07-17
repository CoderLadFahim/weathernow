import LocationSearch from '../components/LocationSearch/LocationSearch';
import AppNav from '../components/AppNav';
import MainDataCard from '../components/MainDataCard';

import TimelyDataToggler from '../components/TimelyDataToggler';
import TimelyDataCard from '../components/TimelyDataCard';
import DetailedTimelyDataDisplay from '../components/DetailedTimelyDataDisplay';

import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

function Dashboard() {
	const history = useHistory();
	const { AppData, dispatch } = useContext(AppContext);
	const [dataIndexToShow, setDataIndexToShow] = useState(null);

	// getting the toggled timely data type
	let timelyData = null;

	switch (AppData.timelyDataType) {
		case 'daily':
			timelyData = AppData.weatherDataToShow.daily;
			break;
		case 'hourly':
			timelyData = AppData.weatherDataToShow.hourly;
			break;
		default:
			timelyData = null;
	}

	const dispatchTimeType = (newType) => {
		dispatch({
			type: 'SET_TIMELY_DATA_TYPE',
			payload: newType,
		});
	};

	const weatherDataURL = (coords) =>
		`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=alerts,minutely&appid=${AppData.apiKey}&units=${AppData.unitSystem}`;

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
				)
				.catch((err) => {
					console.log(err);
				});
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
			{dataIndexToShow !== null ? (
				<DetailedTimelyDataDisplay
					hideDataDisplay={() => setDataIndexToShow(null)}
					dataIndex={dataIndexToShow}
				/>
			) : (
				''
			)}
			<TimelyDataToggler timeTypeToggler={dispatchTimeType} />

			<div className="timely-data-display">
				{timelyData &&
					timelyData.map((data, i) => (
						<TimelyDataCard
							dataIndexSetter={() => setDataIndexToShow(i)}
							timelyWeatherData={data}
							key={i}
						/>
					))}
			</div>
		</section>
	);
}

export default Dashboard;
