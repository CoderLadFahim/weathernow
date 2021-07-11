import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

function TimelyDataCard({ timelyWeatherData }) {
	const {
		AppData: { timelyDataType },
	} = useContext(AppContext);

	const { dt, temp, weather } = timelyWeatherData;
	const [weatherData] = weather;
	const { description, icon } = weatherData;

	return (
		<div className="timely-data-card text-gray-900">
			<h1 className="time">{dt}</h1>
			<div className="weather">
				<img
					src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
					alt="weather icon"
				/>
				<p className="weather-description">{description}</p>{' '}
				<div className="temps">
					<p className="celsius">28°C</p>

					<p className="fahrenheit">55°F</p>
				</div>
			</div>
		</div>
	);
}

export default TimelyDataCard;
