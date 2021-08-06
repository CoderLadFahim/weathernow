import moment from 'moment';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import useTemp from '../useTemp';

function TimelyDataCard({ timelyWeatherData, dataIndexSetter }) {
	const {
		AppData: { timelyDataType, unitSystem },
	} = useContext(AppContext);

	const { dt, temp, weather } = timelyWeatherData;
	const [weatherData] = weather;
	const { main, icon } = weatherData;

	const [tempInF, tempInC] = useTemp(temp, unitSystem);

	return (
		<div
			onClick={dataIndexSetter}
			className="timely-data-card block cursor-pointer bg-gray-200 rounded-xl flex flex-col items-center justify-around text-center"
			style={{ width: '300px' }}
		>
			<h1 className="time text-gray-500">
				{moment.unix(dt).format(timelyDataType === 'daily' ? 'dddd' : 'hA')}
			</h1>

			<div className="weather">
				<img
					src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
					alt="weather icon"
				/>
				<p className="weather-description text-gray-800 font-bold">
					{main}
				</p>{' '}
				<div className="temperatures flex w-full justify-between">
					{unitSystem === 'metric' ? (
						<>
							<p className="celsius text-blue-400 num-font">
								{tempInC}°C
							</p>

							<p className="fahrenheit text-green-400 num-font">
								{tempInF}°F
							</p>
						</>
					) : (
						<>
							<p className="fahrenheit text-green-400 num-font">
								{tempInF}°F
							</p>

							<p className="celsius text-blue-400 num-font">
								{tempInC}°C
							</p>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default TimelyDataCard;
