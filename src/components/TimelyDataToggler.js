function TimelyDataToggler({ timeTypeToggler, activeTimeType }) {
	const toggleTimeType = ({
		target: {
			dataset: { toggleType },
		},
	}) => timeTypeToggler(toggleType);

	return (
		<ul
			className="timely-data-toggler flex my-5 container cursor-pointer space-x-4"
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
