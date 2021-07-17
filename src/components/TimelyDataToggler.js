import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

function TimelyDataToggler({ timeTypeToggler }) {
	const {
		AppData: { timelyDataType },
		dispatch,
	} = useContext(AppContext);

	const toggleTimeType = ({
		target: {
			dataset: { toggleType },
		},
	}) => timeTypeToggler(toggleType);

	return (
		<ul className="timely-data-toggler" onClick={toggleTimeType}>
			<li
				data-toggle-type="daily"
				className={`data-toggler ${
					timelyDataType === 'daily' ? 'active-timeType' : ''
				}`}
			>
				Daily
			</li>
			<li
				data-toggle-type="hourly"
				className={`data-toggler ${
					timelyDataType === 'hourly' ? 'active-timeType' : ''
				}`}
			>
				Hourly
			</li>
		</ul>
	);
}

export default TimelyDataToggler;
