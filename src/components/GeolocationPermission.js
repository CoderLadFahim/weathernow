import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function GeolocationPermission() {
	const [permissionStateChanged, setPermissionStateChanged] = useState(false);

	navigator.permissions
		.query({ name: 'geolocation' })
		.then((permissionStatus) => {
			permissionStatus.onchange = () => setPermissionStateChanged(true);
		});

	return (
		<h1 className="text-center text-3xl text-green-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
			{!permissionStateChanged ? (
				<span>
					{' '}
					<FontAwesomeIcon
						icon={faMapMarkerAlt}
						className="text-gray-400 animate-pulse"
					/>{' '}
					<br /> Allow Location Access{' '}
				</span>
			) : (
				<button
					className="bg-blue-500 text-white rounded-lg shadow py-2 px-5 text-2xl font-bold transition duration-100 hover:bg-blue-400 outline-none 2xl:text-3xl 2xl:py-3 2xl:px-6"
					onClick={() => window.location.reload()}
				>
					Refresh
				</button>
			)}
		</h1>
	);
}

export default GeolocationPermission;
