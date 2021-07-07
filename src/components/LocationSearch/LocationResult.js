function LocationResult({foundLocation}) {
	return (
		<div className="location-result">
			<h2 className="location-name">{foundLocation.name + ', ' + foundLocation.country}</h2>

			<h4>({foundLocation.lat.toFixed(0) + ', ' + foundLocation.lon.toFixed(0)})</h4>

			<h3>LOCATION_CONTINENT</h3>
		</div>
	);
}
export default LocationResult;
