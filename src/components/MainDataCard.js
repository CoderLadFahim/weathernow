import moment from 'moment';
import DataCardsDisplay from './DataCardsDisplay.js';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

function MainDataCard({ locationTimezone, mainData }) {
	const {
		AppData: { unitSystem },
	} = useContext(AppContext);

	const weatherDescription = mainData ? mainData.weather[0].main : null;
	const temperature = mainData ? mainData.temp.toFixed(0) : null;
	const currentTime =
		mainData && moment.unix(mainData.dt).format('h:mm A, dddd');

	return (
		<section className="main-data-card container w-1/2 bg-gray-200 text-gray-800 rounded-2xl shadow px-5 py-3">
			<div className="flex justify-between">
				<div className="current-weather-data">
					<h1 className="location-timezone font-bold text-gray-600">
						{locationTimezone}
					</h1>
					<h2 className="time text-blue-400 font-bold text-sm">
						{currentTime}
					</h2>

					<h1 className="font-extrabold text-xl mb-1 capitalize">
						{weatherDescription}
					</h1>
					<h1 className="temperature num-font text-6xl font-bold relative">
						<span
							className={`text-${
								unitSystem === 'metric' ? 'green' : 'blue'
							}-400 transition`}
						>
							{temperature}
						</span>

						<span className="temp-unit text-xs text-gray-600 absolute top-2 right-6">
							°{unitSystem === 'metric' ? 'C' : 'F'}
						</span>
					</h1>
				</div>
				{mainData && (
					<img
						src={`http://openweathermap.org/img/wn/${mainData.weather[0].icon}@2x.png`}
						className="w-32"
						alt="weather icon"
					/>
				)}
			</div>
			<DataCardsDisplay />
		</section>
	);
}

export default MainDataCard;
