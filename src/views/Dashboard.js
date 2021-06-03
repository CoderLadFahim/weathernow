import { useHistory } from 'react-router-dom';
import LocationInput from '../components/LocationInput';

function Dashboard() {
	const history = useHistory();

	navigator.permissions
		.query({ name: 'geolocation' })
		.then(permissionStatus => {
			const { state } = permissionStatus;

			if (state !== 'granted') history.push('/');
		});

	return (
		<section>
			This is the dashboard
			<LocationInput />
		</section>
	);
}

export default Dashboard;
