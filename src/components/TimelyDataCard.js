import moment from 'moment';
import { useContext, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';

function TimelyDataCard({ timelyWeatherData, dataIndexSetter }) {
	const {
		AppData: { timelyDataType, unitSystem },
		dispatch,
	} = useContext(AppContext);

	const { dt, temp, weather } = timelyWeatherData;
	const [weatherData] = weather;
	const { description, icon } = weatherData;

	// converting the average temperatures to different unit systems
	const [tempInF, tempInC] = (() => {
		let avgTemp = null;

		typeof temp === 'object' && temp !== null
			? // calculating the average temperature from the weatherData property
			  (avgTemp =
					Object.values(temp).reduce((a, v) => a + v) /
					Object.keys(temp).length)
			: (avgTemp = temp);

		avgTemp = avgTemp.toFixed(0);

		return unitSystem === 'metric'
			? [(avgTemp * (9 / 5) + 32).toFixed(0), avgTemp]
			: [avgTemp, ((avgTemp - 32) * (5 / 9)).toFixed(0)];
	})();

	// setting the temperatures on the AppContext to access it from the DetailedTimelyDataDisplay
	useEffect(
		() =>
			dispatch({ type: 'SET_TEMPERATURE', payload: { tempInC, tempInF } }),
		[]
	);
	return (
		<section
			onClick={dataIndexSetter}
			className="timely-data-card border border-blue-400 text-gray-900 cursor-pointer"
		>
			<h1 className="time text-blue-200">
				{moment.unix(dt).format(timelyDataType === 'daily' ? 'dddd' : 'hA')}
			</h1>

			<div className="weather">
				<img
					src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
					alt="weather icon"
				/>
				<p className="weather-description">{description}</p>{' '}
				<div className="temperatures">
					{unitSystem === 'metric' ? (
						<>
							<p className="celsius">{tempInC}°C</p>

							<p className="fahrenheit">{tempInF}°F</p>
						</>
					) : (
						<>
							<p className="fahrenheit">{tempInF}°F</p>

							<p className="celsius">{tempInC}°C</p>
						</>
					)}
				</div>
			</div>
		</section>
	);
}

export default TimelyDataCard;
