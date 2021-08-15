import LocationSearch from '../components/LocationSearch/LocationSearch';
import AppNav from '../components/AppNav';
import MainDataCard from '../components/MainDataCard';
import AuthorContact from '../components/AuthorContact';

import TimelyDataToggler from '../components/TimelyDataToggler';
import TimelyDataCard from '../components/TimelyDataCard';
import TimelyDataCarousel from '../components/TimelyDataCarousel';
import DetailedTimelyDataDisplay from '../components/DetailedTimelyDataDisplay';

import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

function Dashboard() {
	const history = useHistory();
	const { AppData, dispatch } = useContext(AppContext);
	const [dataIndexToShow, setDataIndexToShow] = useState(null);
	const [showAuthorContact, setShowAuthorContact] = useState(false);
	// Used by MainDataCard to hide the time if data is not local, set from AppNav
	const [dataIsLocal, setDataIsLocal] = useState(null);

	const updateDataStatus = (dataLocalBool) => setDataIsLocal(dataLocalBool);
	const toggleAuthorContact = () =>
		setShowAuthorContact((prevState) => !prevState);

	// getting the toggled timely data type
	let timelyData =
		AppData.timelyDataType === 'daily'
			? AppData.weatherDataToShow.daily
			: AppData.weatherDataToShow.hourly;

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
		<section className="text-gray-100 bg-gray-800 h-screen pt-6 sm:pt-10  shadow text-font-light">
			<AppNav
				authorContactToggler={toggleAuthorContact}
				dataStatusUpdater={updateDataStatus}
			/>

			{showAuthorContact && (
				<AuthorContact authorContactToggler={toggleAuthorContact} />
			)}

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
					dataLocalBool={dataIsLocal}
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

			{dataIsLocal ? (
				<>
					<TimelyDataToggler
						timeTypeToggler={dispatchTimeType}
						activeTimeType={AppData.timelyDataType}
					/>

					<TimelyDataCarousel
						dataIndexSetter={setDataIndexToShow}
						timelyData={timelyData}
					/>
				</>
			) : (
				<h1 className="w-4/5 text-center container mt-24">
					Timely data not available for foreign locations <br />
					<span className="text-xs text-red-400">(fix it you moron)</span>
				</h1>
			)}
		</section>
	);
}

export default Dashboard;
