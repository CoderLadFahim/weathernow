import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faWind,
	faTint,
	faRoad,
	faCloud,
} from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

function DataCardsDisplay({ dataToDisplay: mainData }) {
	const {
		AppData,
		// AppData: {
		// 	weatherDataToShow: { current: mainData },
		// },
	} = useContext(AppContext);

	const windSpeed = mainData
		? mainData.wind_speed +
		  `${AppData.unitSystem === 'metric' ? 'm/s' : 'mph'}`
		: '';

	const humidity = mainData ? mainData.humidity + '%' : '';

	const cloudsPercentage = mainData && mainData.clouds + '%';

	const visibility = mainData
		? AppData.unitSystem === 'metric'
			? (mainData.visibility / 1000).toFixed(0) + 'km'
			: (mainData.visibility / 1609).toFixed(0) + 'mi'
		: '';

	const cardsDataDisplay = [
		{ icon: faWind, cardData: windSpeed, dataLabel: 'Wind Speed' },
		{ icon: faTint, cardData: humidity, dataLabel: 'Humidity' },
		{ icon: faRoad, cardData: visibility, dataLabel: 'Visibility' },
		{ icon: faCloud, cardData: cloudsPercentage, dataLabel: 'Clouds' },
	];

	return (
		<div className="data-card-display grid grid-cols-2 grid-rows-2 gap-4 sm:gap-5 md:gap-6 md:flex lg:grid lg:w-5/12 border border-1 border-green-700 xl:hidden">
			{cardsDataDisplay.map((data, i) => (
				<div
					key={i}
					className="data-card bg-gray-100 px-3 py-3 sm:py-8 rounded-xl sm:rounded-2xl flex items-center justify-evenly lg:flex-1 lg:items-center lg:text-center lg:transform-none lg:px-6 md:h-44 md:w-1/3 justify-between md:flex-col md:py-0 lg:px-20 items-center"
				>
					<FontAwesomeIcon
						icon={data.icon}
						className="data-icon block text-gray-500 transform scale-125 sm:scale-200 sm:static"
					/>

					<div className="data-info sm:static text-right">
						<h1 className="data num-font font-bold text-indigo-500 text-sm sm:text-2xl">
							{data.cardData}
						</h1>
						<h2 className="data-label text-gray-400 font-bold text-xs sm:text-xl md:text-xxs">
							{data.dataLabel}
						</h2>
					</div>
				</div>
			))}
		</div>
	);
}

export default DataCardsDisplay;
