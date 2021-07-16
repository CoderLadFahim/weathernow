import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import TimelyDataToggler from './TimelyDataToggler';

function DetailedTimelyDataDisplay({ data }) {
	return (
		<div className="detailed-data-display border">
			<TimelyDataToggler />
			<div className="details-card">
				<div className="card-header">
					<h2 className="day">{moment.unix(data.dt).format('dddd')}</h2>
					<FontAwesomeIcon icon={faTimes} />
				</div>
				<div className="general-data">
					<img
						src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
						alt="weather icon"
					/>
				</div>
			</div>
		</div>
	);
}

export default DetailedTimelyDataDisplay;
