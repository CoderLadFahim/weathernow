import DataCardsDisplay from './DataCardDisplay';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

function MainDataCard({ locationTimezone, mainData }) {
	const {
		AppData: { unitSystem },
	} = useContext(AppContext);

	const weatherDescription = mainData ? mainData.weather[0].description : null;
	const temperature = mainData ? mainData.temp : null;

	return (
		<section className="main-data-card w-1/3 bg-gray-200 text-gray-800">
			<div className="current-weather-data">
				<h1 className="location-timezone">{locationTimezone}</h1>
				<h2 className="time">{JSON.stringify(new Date())}</h2>

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
