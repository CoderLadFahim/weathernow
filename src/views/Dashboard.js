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
	let timelyData =
		AppData.timelyDataType === 'daily'
			? AppData.weatherDataToShow.daily
			: AppData.weatherDataToShow.hourly;

	// timelyData ? (timelyData.length = 3) : null;

	const dispatchTimeType = (newType) =>
		dispatch({
			type: 'SET_TIMELY_DATA_TYPE',
			payload: newType,
		});

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
		<section className="text-gray-100 bg-gray-800 h-screen pt-6 shadow text-font-light">
			<AppNav />
			{AppData.userSearchingLocation && <LocationSearch />}
			{!AppData.weatherDataToShow ? (
				<h1> Loading... </h1>
			) : (
				<MainDataCard
					locationTimezone={
						!AppData.searchedLocationName
							? AppData.weatherDataToShow.timezone
							: AppData.searchedLocationName
					}
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
			<TimelyDataToggler
				timeTypeToggler={dispatchTimeType}
				activeTimeType={AppData.timelyDataType}
			/>

			<div className="timely-data-display container overflow-x-scroll mb-5 flex space-x-3">
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
