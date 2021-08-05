import moment from 'moment';
import DataCardsDisplay from './DataCardsDisplay.js';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

function MainDataCard({ locationTimezone, mainData }) {
	const {
		AppData: { unitSystem },
	} = useContext(AppContext);

	const weatherDescription = mainData ? mainData.weather[0].description : null;
	const temperature = mainData ? mainData.temp : null;
	const currentTime =
		mainData && moment.unix(mainData.dt).format('h:mm A, dddd');

	return (
		<section className="main-data-card container w-1/2 bg-gray-200 mt-3 text-gray-800 rounded-2xl shadow">
			<div className="current-weather-data">
				<h1 className="location-timezone">{locationTimezone}</h1>
				<h2 className="time">{currentTime}</h2>

				<h1>{weatherDescription}</h1>
				<h1 className="temperature">
					{temperature}

					<span className="temp-unit">
						°{unitSystem === 'metric' ? 'C' : 'F'}
					</span>
				</h1>
			</div>
			{mainData && (
				<img
					src={`http://openweathermap.org/img/wn/${mainData.weather[0].icon}@2x.png`}
					alt="weather icon"
				/>
			)}

			<DataCardsDisplay />
		</section>
	);
}

export default MainDataCard;
