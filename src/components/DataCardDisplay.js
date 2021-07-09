import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind } from "@fortawesome/free-solid-svg-icons";
import { faTint } from "@fortawesome/free-solid-svg-icons";
import { faRoad } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

function DataCardDisplay() {
	const {
		AppData, 
		AppData: {
			weatherDataToShow: { current: mainData },
		},
	} = useContext(AppContext);

	const windSpeed = mainData
		? mainData.wind_speed + `${AppData.unitSystem === "metric" ? "m/s" : "mph"}`
		: "";

	const humidity = mainData ? mainData.humidity + "%" : "";

	const UVindex = mainData ? mainData.uvi : "";

	const visibility = mainData
		? AppData.unitSystem === "metric"
			? mainData.visibility + "m"
			: (mainData.visibility / 1609).toFixed(0) + "mi"
		: "";
	return (
		<div className="data-card-display">
			<div className="data-card">
				<FontAwesomeIcon icon={faWind} className="data-icon" />
				<div className="data-info">
					<h1 className="data">{windSpeed}</h1>
					<h2 className="data-label">Wind Speed</h2>
				</div>
			</div>

			{/* Humidity */}

			<div className="data-card">
				<FontAwesomeIcon icon={faTint} className="data-icon" />
				<div className="data-info">
					<h1 className="data">{humidity}</h1>
					<h2 className="data-label">Humidity</h2>
				</div>
			</div>

			{/* Visibility */}

			<div className="data-card">
				<FontAwesomeIcon icon={faRoad} className="data-icon" />
				<div className="data-info">
					<h1 className="data">{visibility}</h1>
					<h2 className="data-label">Visibility</h2>
				</div>
			</div>

			{/* UVI */}

			<div className="data-card">
				<FontAwesomeIcon icon={faSun} className="data-icon" />
				<div className="data-info">
					<h1 className="data">{UVindex}</h1>
					<h2 className="data-label">UV Index</h2>
				</div>
			</div>
		</div>
	);
}

export default DataCardDisplay;
