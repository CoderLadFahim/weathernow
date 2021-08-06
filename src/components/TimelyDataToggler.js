function TimelyDataToggler({ timeTypeToggler, activeTimeType }) {
	const toggleTimeType = ({
		target: {
			dataset: { toggleType },
		},
	}) => timeTypeToggler(toggleType);

	return (
		<ul
			className="timely-data-toggler flex my-4 container  cursor-pointer"
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
