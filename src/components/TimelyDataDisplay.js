import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

function TimelyDataDisplay(timelyData) {
	const {
		AppData: { timelyDataType },
	} = useContext(AppContext);
}
