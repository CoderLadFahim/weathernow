import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faWind,
	faTint,
	faRoad,
	faCloud,
} from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

function DataCardsDisplay() {
	const {
		AppData,
		AppData: {
			weatherDataToShow: { current: mainData },
		},
	} = useContext(AppContext);

	const windSpeed = mainData
		? mainData.wind_speed +
		  `${AppData.unitSystem === 'metric' ? 'm/s' : 'mph'}`
		: '';

	const humidity = mainData ? mainData.humidity + '%' : '';

	const cloudsPercentage = mainData && mainData.clouds + '%';

	const visibility = mainData
		? AppData.unitSystem === 'metric'
			? mainData.visibility + 'm'
			: (mainData.visibility / 1609).toFixed(0) + 'mi'
		: '';

	const cardsDataDisplay = [
		{ icon: faWind, cardData: windSpeed, dataLabel: 'Wind Speed' },
		{ icon: faTint, cardData: humidity, dataLabel: 'Humidity' },
		{ icon: faRoad, cardData: visibility, dataLabel: 'Visibility' },
		{ icon: faCloud, cardData: cloudsPercentage, dataLabel: 'Clouds' },
	];

	return (
		<div className="data-card-display grid grid-cols-2 grid-rows-2 gap-4">
			{cardsDataDisplay.map((data, i) => (
				<div
					key={i}
					className="data-card bg-gray-100 py-8 px-3 rounded-xl flex items-center justify-center relative"
				>
					<FontAwesomeIcon
						icon={data.icon}
						className="data-icon block text-gray-500 absolute left-5 transform scale-125"
					/>
					<div className="data-info absolute left-12">
						<h1 className="data num-font font-bold text-blue-400 text-sm">
							{data.cardData}
						</h1>
						<h2 className="data-label text-gray-400 font-bold text-xs">
							{data.dataLabel}
						</h2>
					</div>
				</div>
			))}
		</div>
	);
}

export default DataCardsDisplay;
