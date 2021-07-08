import continents from "../../continents.json";

function LocationResult({ foundLocation }) {
	const locationContinent = (() => {
		for (const continentName in continents) {
			if (continents[continentName].includes(foundLocation.country))
				return continentName;
		}
	})();

	return (
		<div className="location-result bg-gray-100 text-gray-800">
			<h2 className="location-name">
				{foundLocation.name + ", " + foundLocation.country},{' '} 
				<img
					src={`https://flagcdn.com/16x12/${foundLocation.country.toLowerCase()}.png`}
					className="inline"
					alt=""
				/>
			</h2>

			<h4>
				(
				{foundLocation.lat.toFixed(2) + ", " + foundLocation.lon.toFixed(2)}
				)
			</h4>

			<h3 className="capitalize">{locationContinent}</h3>
		</div>
	);
}
export default LocationResult;
