import moment from 'moment';
import TimelyDataToggler from './TimelyDataToggler';
import DataCardDisplay from './DataCardDisplay';

import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function DetailedTimelyDataDisplay({ data, hideDataDisplay }) {
	const [weather] = data.weather;
	const iconCode = weather.icon;
	const {
		AppData: { timelyDataType, unitSystem },
	} = useContext(AppContext);

	return (
		<div className="detailed-data-display border bg-indigo-800">
			<TimelyDataToggler />

			<div className="details-card">
				<div className="card-header">
					{timelyDataType === 'hourly' && (
						<h2 className="day">{moment.unix(data.dt).format('dddd')}</h2>
					)}
					<FontAwesomeIcon
						className="cursor-pointer"
						onClick={hideDataDisplay}
						icon={faTimes}
					/>
				</div>
				<div className="general-data">
					<img
						src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`}
						alt="weather icon"
					/>

					<div className="temps">
						{unitSystem === 'metric' ? (
							<>
								<p className="celsius">28°C</p>

								<p className="fahrenheit">55°F</p>
							</>
						) : (
							<>
								<p className="fahrenheit">55°F</p>

								<p className="celsius">28°C</p>
							</>
						)}
					</div>

					<h2 className="weather-desc">{weather.description}</h2>

					<DataCardDisplay />
				</div>
			</div>
		</div>
	);
}

export default DetailedTimelyDataDisplay;
