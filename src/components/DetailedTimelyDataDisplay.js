import moment from 'moment';
import TimelyDataToggler from './TimelyDataToggler';
import DataCardDisplay from './DataCardDisplay';

import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function DetailedTimelyDataDisplay({ dataIndex, data, hideDataDisplay }) {
	const [weather] = data.weather;
	const iconCode = weather.icon;
	const {
		AppData: {
			weatherDataToShow,
			timelyDataType,
			unitSystem,
			temperatures: { tempInC, tempInF },
		},
	} = useContext(AppContext);

	const car = weatherDataToShow[timelyDataType][dataIndex];

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

					<h2 className="weather-desc">{weather.description}</h2>

					<DataCardDisplay />

					<div className="toggle-time">
						<svg
							className="left-arrow"
							width="26"
							height="32"
							viewBox="0 0 26 32"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1.82861 18.5092C0.0211775 17.3246 0.0211747 14.6754 1.82861 13.4908L21.1056 0.857288C23.1007 -0.450256 25.75 0.98103 25.75 3.36644V28.6336C25.75 31.019 23.1007 32.4503 21.1056 31.1427L1.82861 18.5092Z"
								fill="#3B82F6"
							/>
						</svg>
						moment .unix(data.dt) .format(timelyDataType === 'daily' ?
						'dddd' : 'hA')
						<svg
							className="right-arrow"
							width="26"
							height="32"
							viewBox="0 0 26 32"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M24.1714 18.5092C25.9788 17.3246 25.9788 14.6754 24.1714 13.4908L4.89443 0.857288C2.8993 -0.450256 0.25 0.98103 0.25 3.36644V28.6336C0.25 31.019 2.8993 32.4503 4.89443 31.1427L24.1714 18.5092Z"
								fill="#34D399"
							/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DetailedTimelyDataDisplay;
