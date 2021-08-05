function TimelyDataToggler({ timeTypeToggler, activeTimeType }) {
	const toggleTimeType = ({
		target: {
			dataset: { toggleType },
		},
	}) => timeTypeToggler(toggleType);

	return (
		<ul
			className="timely-data-toggler flex ml-3 my-4 cursor-pointer container"
			onClick={toggleTimeType}
		>
			<li
				data-toggle-type="daily"
				className={`data-toggler ${
					activeTimeType === 'daily' ? 'active-timeType' : ''
				}`}
			>
				Daily
			</li>
			<li
				data-toggle-type="hourly"
				className={`data-toggler ${
					activeTimeType === 'hourly' ? 'active-timeType' : ''
				}`}
			>
				Hourly
			</li>
		</ul>
	);
}

export default TimelyDataToggler;
