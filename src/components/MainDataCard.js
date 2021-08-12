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
		<section className="main-data-card container flex flex-col justify-evenly w-1/2 h-1/2 xs:h-3/5 bg-gray-200 text-gray-800 rounded-2xl sm:rounded-3xl px-5 py-3 relative lg:rounded-3xl lg:justify-between lg:h-2/5 lg:flex-row lg:bg-transparent lg:px-0 lg:items-center">
			<div className="flex mb-4 sm:justify-evenly lg:bg-gray-200 lg:rounded-2xl lg:h-4/5 lg:relative lg:w-1/2 lg:block">
				<div className="current-weather-data lg:w-64 lg:p-5">
					<h1 className="location-timezone font-bold text-gray-600 relative text-xs xs:text-sm sm:text-base lg:text-lg">
						{locationTimezone}
					</h1>
					<h2 className="time text-blue-400 font-bold text-sm xs:text-base sm:text-lg lg:text-xl">
						{currentTime}
					</h2>

					<h1 className="font-extrabold text-xl xs:text-2xl mb-1 capitalize lg:text-2xl">
						{weatherDescription}
					</h1>
					<h1 className="temperature num-font text-6xl xs:text-7xl sm:text-8xl font-bold relative">
						<span
							className={`text-${
								unitSystem === 'metric' ? 'green' : 'blue'
							}-400 transition`}
						>
							{temperature}
						</span>

						<span className="temp-unit text-xs text-gray-600 absolute top-2 lg:text-sm top-3">
							°{unitSystem === 'metric' ? 'C' : 'F'}
						</span>
					</h1>
				</div>
				{mainData && (
					<img
						src={`http://openweathermap.org/img/wn/${mainData.weather[0].icon}@2x.png`}
						className="w-32 absolute xs:w-44 sm:w-52 right-0 sm:static lg:w-48 lg:absolute lg:top-36 right-4 transform scale-150"
						alt="weather icon"
					/>
				)}
			</div>
			<DataCardsDisplay dataToDisplay={mainData} />
		</section>
	);
}

export default MainDataCard;
