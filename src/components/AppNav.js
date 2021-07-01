import { useState, useContext } from "react";
import {WeatherContext} from '../contexts/WeatherContext';

function AppNav() {
	const {currentUnitSystem, unitSystemSetter} = useContext(WeatherContext);

	const switchUnitSystem = () =>
		unitSystemSetter((prevSystem) =>
			prevSystem === "metric"
				? (prevSystem = "imperial")
				: (prevSystem = "metric")
		);

	return (
		<nav className="app-nav">
			<ul>
				<li>Local</li>
				<li>Search Location</li>
				<li className="border" onClick={switchUnitSystem}>
					{currentUnitSystem}
				</li>{" "}
			</ul>{" "}
		</nav>
	);
}

export default AppNav;
