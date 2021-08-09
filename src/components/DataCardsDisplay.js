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

	const cloudsPercentage = mainData && mainData.clouds;

	const visibility = mainData
		? AppData.unitSystem === 'metric'
			? mainData.visibility + 'm'
			: (mainData.visibility / 1609).toFixed(0) + 'mi'
		: '';

	return (
		<div className="data-card-display grid grid-cols-2 grid-rows-2 gap-4">
			<div className="data-card bg-gray-100 py-3 px-3 rounded-xl flex items-center justify-center">
				<FontAwesomeIcon
					icon={faWind}
					className="data-icon block text-gray-600"
				/>
				<div className="data-info">
					<h1 className="data font-bold text-blue-400">{windSpeed}</h1>
					<h2 className="data-label text-gray-400 font-bold text-xs">
						Wind Speed
					</h2>
				</div>
			</div>

			{/* Humidity */}

			<div className="data-card">
				<FontAwesomeIcon icon={faTint} className="data-icon" />
				<div className="data-info">
					<h1 className="data">{humidity}</h1>
					<h2 className="data-label">Humidity</h2>
				</div>
			</div>

			{/* Visibility */}

			<div className="data-card">
				<FontAwesomeIcon icon={faRoad} className="data-icon" />
				<div className="data-info">
					<h1 className="data">{visibility}</h1>
					<h2 className="data-label">Visibility</h2>
				</div>
			</div>

			{/* Clouds Percentage */}

			<div className="data-card">
				<FontAwesomeIcon icon={faCloud} className="data-icon" />
				<div className="data-info">
					<h1 className="data">{cloudsPercentage}%</h1>
					<h2 className="data-label">Clouds</h2>
				</div>
			</div>
		</div>
	);
}

export default DataCardsDisplay;
