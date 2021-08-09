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
			className="timely-data-card cursor-pointer w-24 h-40 bg-gray-200 px-6 py-2 rounded-2xl flex shadow  flex-col items-center justify-between text-center"
		>
			<h1 className="time text-gray-500 text-sm">
				{moment.unix(dt).format(timelyDataType === 'daily' ? 'dddd' : 'hA')}
			</h1>
			{/* <div className="weather"> */}
			<img
				src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
				className="transform scale-150"
				alt="weather icon"
			/>
			<p className="weather-description text-sm text-gray-800 font-bold">
				{main}
			</p>{' '}
			<div className="temperatures flex text-xs num-font items-center mt-3 justify-between space-x-3">
				{unitSystem === 'metric' ? (
					<>
						<p className="celsius text-blue-400">{tempInC}°C</p>

						<p className="fahrenheit text-green-400 ">{tempInF}°F</p>
					</>
				) : (
					<>
						<p className="fahrenheit text-green-400 ">{tempInF}°F</p>

						<p className="celsius text-blue-400 ">{tempInC}°C</p>
					</>
				)}
			</div>
			{/* </div> */}
		</div>
	);
}

export default TimelyDataCard;
