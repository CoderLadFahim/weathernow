import moment from 'moment';
import TimelyDataToggler from './TimelyDataToggler';
import DataCardDisplay from './DataCardsDisplay';

import { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import useTemp from '../useTemp';

function DetailedTimelyDataDisplay({ dataIndex, hideDataDisplay }) {
	// initializing the index to display, initially the component will render dataIndex passed in as props (what the use clicked to see)
	const [timelyDataIndex, setTimelyDataIndex] = useState(dataIndex);

	const {
		AppData: { weatherDataToShow, unitSystem },
	} = useContext(AppContext);

	const [timelyDataType, setTimelyDataType] = useState('hourly');

	const data = weatherDataToShow[timelyDataType][timelyDataIndex];
	const [tempInF, tempInC] = useTemp(data.temp, unitSystem);
	const [weather] = data.weather;
	const iconCode = weather.icon;

	const btnDisabledCol = '#6b7280';
	const btnBlue = '#3B82F6';
	const btnGreen = '#34D399';

	const updateLocalTimelyDataType = (newType) => {
		setTimelyDataType(newType);
		// setting the data index to 0 to avoid undefined error on line 21
		setTimelyDataIndex(0);
	};

	const decrementDataIndex = () => {
		if (timelyDataIndex > 0)
			return setTimelyDataIndex((prevIndex) => prevIndex - 1);
	};

	const incrementDataIndex = () => {
		if (timelyDataIndex < weatherDataToShow[timelyDataType].length - 1)
			return setTimelyDataIndex((prevIndex) => prevIndex + 1);
	};

	return (
		<div className="detailed-data-display bg-gray-800 absolute top-0 right-0 bottom-0 left-0 bg-opacity-90 flex flex-col z-10">
			<TimelyDataToggler
				timeTypeToggler={updateLocalTimelyDataType}
				activeTimeType={timelyDataType}
			/>

			<div className="details-card bg-gray-200 container rounded-3xl px-5 pt-3 h-4/5 flex flex-col">
				{/* CARD HEADER */}
				<div className="card-header text-gray-400 font-extrabold text-lg flex justify-between align-baseline items-center">
					<h2
						className={`day ${
							timelyDataType !== 'hourly' ? 'opacity-0' : ''
						} md:text-2xl`}
					>
						{moment.unix(data.dt).format('dddd')}
					</h2>
					<FontAwesomeIcon
						className="cursor-pointer transform scale-125"
						onClick={hideDataDisplay}
						icon={faTimes}
					/>
				</div>

				<div className="general-data border border-2 h-full flex flex-col justify-around">
					<img
						src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`}
						alt="weather icon"
						className="mx-auto my-0 transform scale-125 sm:scale-150"
					/>

					<div className="temps num-font flex items-center justify-around text-5xl space-x-5 sm:text-6xl">
						{unitSystem === 'metric' ? (
							<>
								<h1 className="celsius text-green-400 relative">
									{tempInC}
									<span className="text-gray-500 text-xs absolute top-2">
										°C
									</span>
								</h1>

								<h1 className="fahrenheit text-blue-400 relative">
									{tempInF}
									<span className="text-gray-500 text-xs absolute top-2">
										°F
									</span>
								</h1>
							</>
						) : (
							<>
								<p className="fahrenheit">{tempInF}°F</p>

								<p className="celsius">{tempInC}°C</p>
							</>
						)}
					</div>

					<h2 className="weather-desc text-gray-600 capitalize font-bold text-center text-lg sm:text-3xl">
						{weather.main}
					</h2>

					<DataCardDisplay />

					<div className="toggle-time text-gray-700 font-bold text-xl flex justify-between align-baseline items-center sm:text-2xl w-3/4 mx-auto">
						<svg
							className="left-arrow transition duration-50  transform cursor-pointer hover:scale-125"
							onClick={decrementDataIndex}
							width="26"
							height="32"
							viewBox="0 0 26 32"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1.82861 18.5092C0.0211775 17.3246 0.0211747 14.6754 1.82861 13.4908L21.1056 0.857288C23.1007 -0.450256 25.75 0.98103 25.75 3.36644V28.6336C25.75 31.019 23.1007 32.4503 21.1056 31.1427L1.82861 18.5092Z"
								// fill={'#3B82F6'}
								fill={timelyDataIndex === 0 ? btnDisabledCol : btnGreen}
							/>
						</svg>
						{moment
							.unix(data.dt)
							.format(timelyDataType === 'daily' ? 'dddd' : 'hA')}
						<svg
							className="right-arrow transition duration-50 cursor-pointer transform hover:scale-125"
							onClick={incrementDataIndex}
							width="26"
							height="32"
							viewBox="0 0 26 32"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M24.1714 18.5092C25.9788 17.3246 25.9788 14.6754 24.1714 13.4908L4.89443 0.857288C2.8993 -0.450256 0.25 0.98103 0.25 3.36644V28.6336C0.25 31.019 2.8993 32.4503 4.89443 31.1427L24.1714 18.5092Z"
								fill={
									timelyDataIndex <
									weatherDataToShow[timelyDataType].length - 1
										? btnBlue
										: btnDisabledCol
								}
							/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DetailedTimelyDataDisplay;
