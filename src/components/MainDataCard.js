import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind } from "@fortawesome/free-solid-svg-icons";
import { faTint } from "@fortawesome/free-solid-svg-icons";
import { faRoad } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { AppContext } from "../contexts/AppContext";

function MainDataCard({ locationTimezone, mainData }) {
	const {
		AppData: { unitSystem },
	} = useContext(AppContext);

	const windSpeed = mainData
		? mainData.wind_speed + `${unitSystem === "metric" ? "m/s" : "mph"}`
		: "";

	const humidity = mainData ? mainData.humidity + "%" : "";

	const UVindex = mainData ? mainData.uvi : "";

	const visibility = mainData
		? unitSystem === "metric"
			? mainData.visibility + "m"
			: (mainData.visibility / 1609).toFixed(0) + "mi"
		: "";

	return (
		<section className="main-data-card w-1/3 bg-gray-200 text-gray-800">
			<div className="current-weather-data">
				<h1 className="location-timezone">{locationTimezone}</h1>
				<h2 className="time">{JSON.stringify(new Date())}</h2>

				<h1>{mainData && mainData.weather[0].description}</h1>
				<h1 className="temperature">
					{mainData && mainData.temp}

					<span className="temp-unit">
						°{unitSystem === "metric" ? "C" : "F"}
					</span>
				</h1>
			</div>

			{mainData && (
				<img
					src={`http://openweathermap.org/img/wn/${mainData.weather[0].icon}@2x.png`}
					alt="weather icon"
				/>
			)}

			{/* Data Cards */}

			<div className="data-cards">
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
		</section>
	);
}

export default MainDataCard;
