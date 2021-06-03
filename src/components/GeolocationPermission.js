import { useState } from 'react';

function GeolocationPermission() {
	const [permissionStateChanged, setPermissionStateChanged] = useState(false);

	navigator.permissions
		.query({ name: 'geolocation' })
		.then(permissionStatus => {
			permissionStatus.onchange = () => setPermissionStateChanged(true);
		});

	return (
		<h1>
			{!permissionStateChanged ? (
				'Allow Location Access'
			) : (
				<button onClick={() => window.location.reload()}>Refresh</button>
			)}
		</h1>
	);
}

export default GeolocationPermission;
