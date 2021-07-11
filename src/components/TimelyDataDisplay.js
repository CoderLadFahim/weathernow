import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

function TimelyDataDisplay(timelyData) {
	const {
		AppData: { timelyDataType },
	} = useContext(AppContext);

	return (
		<div className="timely-data-card">
			<h1 className="time">CURRENT_TIME</h1>
			<div className="weather">
				<img
					src={`http://openweathermap.org/img/wn/${'ehy'}@2x.png`}
					alt="weather icon"
				/>
				<p className="weather-description">WEATHER_DESC </p>{' '}
				<div className="temps">
					<p className="celsius">28°C</p>

					<p className="fahrenheit">55°F</p>
				</div>
			</div>
		</div>
	);
}

export default TimelyDataDisplay;
