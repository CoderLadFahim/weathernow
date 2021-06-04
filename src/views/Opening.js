import { useHistory } from 'react-router-dom';
import GeolocationPermission from '../components/GeolocationPermission';
import AppLogo from '../components/AppLogo';
import { useContext } from 'react';
import { WeatherContext } from '../contexts/WeatherContext';

function Opening() {
	const { localCoordsSetter } = useContext(WeatherContext);
	const history = useHistory();

	// checking if the permission has been set first
	navigator.permissions.query({ name: 'geolocation' }).then(permissionState => {
		const { state } = permissionState;

		// redirecting to /dashboard if granted
		if (state === 'granted') return history.push('/dashboard');
	});

	// setting the local coords to WeatherContext
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			// setting the local coords to WeatherContext
			localCoordsSetter({
				lat: position.coords.latitude,
				lon: position.coords.longitude,
			});
		});
	}

	return (
		<section className="opening h-screen bg-gray-800 text-white font-bold text-font">
			<AppLogo />
			<GeolocationPermission />
		</section>
	);
}

export default Opening;
