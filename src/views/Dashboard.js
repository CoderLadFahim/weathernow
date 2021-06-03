import { useHistory } from 'react-router-dom';

function Dashboard() {
	const history = useHistory();

	navigator.permissions
		.query({ name: 'geolocation' })
		.then(permissionStatus => {
			const { state } = permissionStatus;

			if (state !== 'granted') history.push('/');
		});

	return <h1>This is the dashboard</h1>;
}

export default Dashboard;
