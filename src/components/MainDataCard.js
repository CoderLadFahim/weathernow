import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { AppContext } from "../contexts/AppContext";

function MainDataCard({ locationTimezone, mainData }) {
	const {
		AppData: { unitSytem },
	} = useContext(AppContext);

	return (
		<section className="main-data-card bg-gray-200 text-gray-800">
			<div className="current-weather-data">
				<h1 className="location-timezone">{locationTimezone}</h1>
				<h2 className="time">{JSON.stringify(new Date())}</h2>

				<h1>{mainData && mainData.weather[0].description}</h1>
				<h1 className="temperature">{mainData && mainData.temp}</h1>
			</div>
			
			{mainData && (
				<img
					src={`http://openweathermap.org/img/wn/${mainData.weather[0].icon}@2x.png`}
					alt=""
				/>
			)}

			<div className="data-card">
				<FontAwesomeIcon icon={faCloud} className="data-icon" />
			</div>

			<pre className="current-location">
				{JSON.stringify({ locationTimezone, ...mainData }, undefined, 2)}
			</pre>
		</section>
	);
}

export default MainDataCard;
