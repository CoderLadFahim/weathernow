import moment from 'moment';
import { useContext, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import useTemp from '../useTemp';

function TimelyDataCard({ timelyWeatherData, dataIndexSetter }) {
	const {
		AppData: { timelyDataType, unitSystem },
		dispatch,
	} = useContext(AppContext);

	const { dt, temp, weather } = timelyWeatherData;
	const [weatherData] = weather;
	const { description, icon } = weatherData;

	const [tempInF, tempInC] = useTemp(temp, unitSystem);

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
