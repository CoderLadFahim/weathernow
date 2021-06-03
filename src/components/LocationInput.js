import { useContext, useState } from 'react';
import { WeatherContext } from '../contexts/WeatherContext';

function LocationInput() {
	const [locationQuery, setLocationQuery] = useState('');
	const { coordsFetcher } = useContext(WeatherContext);

	const handleSubmit = e => {
		e.preventDefault();
		coordsFetcher(locationQuery);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				value={locationQuery}
				onChange={e => setLocationQuery(e.target.value)}
				placeholder="Search location"
			></input>
			<button>Go</button>
		</form>
	);
}

export default LocationInput;
