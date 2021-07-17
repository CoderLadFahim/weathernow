// takes in a temp (can be an obj or num) and a unit system for conversion
const useTemp = (temp, unitSystem) => {
	let avgTemp = null;

	typeof temp === 'object' && temp !== null
		? // calculating the average temperature from the weatherData property
		  (avgTemp =
				Object.values(temp).reduce((a, v) => a + v) /
				Object.keys(temp).length)
		: (avgTemp = temp);

	avgTemp = avgTemp.toFixed(0);

	return unitSystem === 'metric'
		? [(avgTemp * (9 / 5) + 32).toFixed(0), avgTemp]
		: [avgTemp, ((avgTemp - 32) * (5 / 9)).toFixed(0)];
};

export default useTemp;
