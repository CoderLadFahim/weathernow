import continents from "../../continents.json";

function LocationResult({ foundLocation }) {
	
	const locationContinent = (() => {
		for (const continentName in continents) {
			if (continents[continentName].includes(foundLocation.country)) return continentName;
		}
	})()

	return (
		<div className="location-result">
			<h2 className="location-name">
				{foundLocation.name + ", " + foundLocation.country}
			</h2>

			<h4>
				(
				{foundLocation.lat.toFixed(0) + ", " + foundLocation.lon.toFixed(0)}
				)
			</h4>

			<h3 className="capitalize">{locationContinent}</h3>
		</div>
	);
}
export default LocationResult;
