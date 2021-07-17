import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

function TimelyDataToggler({ typeToggler }) {
	const {
		AppData: { timelyDataType },
		dispatch,
	} = useContext(AppContext);

	const timeTypeToggler = ({
		target: {
			dataset: { toggleType },
		},
	}) => {
		dispatch({
			type: 'SET_TIMELY_DATA_TYPE',
			payload: toggleType,
		});

		typeToggler(toggleType);
	};

	return (
		<ul className="timely-data-toggler" onClick={timeTypeToggler}>
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
