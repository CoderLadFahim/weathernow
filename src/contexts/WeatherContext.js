import { createContext, useState, useEffect } from 'react';

export const WeatherContext = createContext();

function WeatherContextProvider({ children }) {
	const [localCoords, setLocalCoords] = useState({});
	const [weatherData, setWeatherData] = useState(null);

	const apiKey = '051b2b620d19b836a71135e92c59335f';

	// api endpoints
	const geoCoderURL = locationToLookFor =>
		`http://api.openweathermap.org/geo/1.0/direct?q=${locationToLookFor}&limit=${1}&appid=${apiKey}`;

	const weatherDataURL = coords =>
		`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=alerts,minutely&appid=${apiKey}&units=metric`;

	const weatherDataFetcher = coords => {
		fetch(weatherDataURL(coords))
			.then(response => response.json())
			.then(data => setWeatherData(data));
	};

	const fetchCoords = locationQuery => {
		fetch(geoCoderURL(locationQuery))
			.then(response => response.json())
			.then(data => {
				const { lat, lon } = data[0];

				weatherDataFetcher({ lat, lon });
			})
			.catch(err => alert('INVALID LOCATION NAME'));
	};

	// fetching weather data on mount
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
				coordsFetcher: fetchCoords,
			}}
		>
			{children}
		</WeatherContext.Provider>
	);
}

export default WeatherContextProvider;
