import { useState, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import LocationResult from './LocationResult';

function LocationSearch() {
	const { AppData, dispatch } = useContext(AppContext);

	const geoCoderURL = locationToLookFor =>
		`http://api.openweathermap.org/geo/1.0/direct?q=${locationToLookFor}&limit=${1}&appid=${
			AppData.apiKey
		}`;

	const [locationSearchTerm, setLocationSearchTerm] = useState('');

	return (
		<section className="location-search bg-green-100">
			<input
				type="text"
				value={locationSearchTerm}
				onChange={e => setLocationSearchTerm(e.target.value)}
				placeholder="Search Location"
			/>

			<LocationResult />
		</section>
	);
}

export default LocationSearch;
