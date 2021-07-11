import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

function TimelyDataToggler() {
	const {
		AppData: { timelyDataType },
		dispatch,
	} = useContext(AppContext);
	return (
		<ul className="timely-data-toggler">
			<li data-toggle-type="daily" className="data-toggler">
				Daily
			</li>
			<li data-toggle-type="hourly" className="data-toggler">
				Hourly
			</li>
			<li data-toggle-type="minutely" className="data-toggler">
				Minutely
			</li>
		</ul>
	);
}

export default TimelyDataToggler;
