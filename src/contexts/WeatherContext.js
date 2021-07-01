import { createContext, useState, useEffect } from 'react';

export const WeatherContext = createContext();

function WeatherContextProvider({ children }) {
	// setting the unit system as metric by default
	const [unitSystem, setUnitSystem] = useState("metric");

	const [localCoords, setLocalCoords] = useState({});
	const [weatherData, setWeatherData] = useState(null);

	const apiKey = '051b2b620d19b836a71135e92c59335f';

	// API ENDPOINTS
	// this endpoint gets the coords for the searched location (locationToLookFor)
	const geoCoderURL = locationToLookFor =>
		`http://api.openweathermap.org/geo/1.0/direct?q=${locationToLookFor}&limit=${1}&appid=${apiKey}`;

	// this is the main weather data endpoint
	const weatherDataURL = coords =>
		`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=alerts,minutely&appid=${apiKey}&units=${'metric'}`;

	// wrapping the main API call in a function (takes in coords)
	const weatherDataFetcher = coords => {
		fetch(weatherDataURL(coords))
			.then(response => response.json())
			.then(data => setWeatherData(data));
	};

	// wrapping the searched location coords API call in a function (takes in a location string, locationQuery)
	const fetchCoords = locationQuery => {
		fetch(geoCoderURL(locationQuery))
			.then(response => response.json())
			.then(data => {
				// getting lat, lon from the nested array inside 'data'
				const { lat, lon } = data[0];

				// calling the main API
				weatherDataFetcher({ lat, lon });
			})
			.catch(err => alert('INVALID LOCATION NAME'));
	};

	// fetching weather data on mount, (given that local coords have been retrieved from naviagator)
	useEffect(
		() =>
			(localCoords.lat || localCoords.lon) && weatherDataFetcher(localCoords),
		[localCoords]
	);

	return (
		<WeatherContext.Provider
			value={{
				// used by dashboard
				weatherData,
				// used by Opening to set localCoords
				localCoordsSetter: setLocalCoords,
				// used by LocationInput
				coordsFetcher: fetchCoords,
				// used by the AppNav
				currentUnitSystem: unitSystem,
				unitSystemSetter: setUnitSystem
			}}
		>
			{children}
		</WeatherContext.Provider>
	);
}

export default WeatherContextProvider;
