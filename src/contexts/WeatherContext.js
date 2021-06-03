import { createContext, useState } from 'react';

const WeatherContext = createContext();

function WeatherContextProvider({ children }) {
	const [localCoords, setLocalCoords] = useState({});

	const apiKey = '051b2b620d19b836a71135e92c59335f';
	const geocoderURL = locationToLookFor =>
		`http://api.openweathermap.org/geo/1.0/direct?q=${locationToLookFor}&limit=${1}&appid=${apiKey}`;
	const oneCallURL = coords =>
		`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=alerts,minutely&appid=${apiKey}&units=metric`;

	return (
		<WeatherContext.Provider value={{ localCoordsSetter: setLocalCoords }}>
			{children}
		</WeatherContext.Provider>
	);
}

export default WeatherContextProvider;
