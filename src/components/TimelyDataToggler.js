function TimelyDataToggler({
	timeTypeToggler,
	activeTimeType,
	className: additionalClasses,
}) {
	const toggleTimeType = ({
		target: {
			classList,
			dataset: { toggleType },
		},
	}) =>
		Array.from(classList).includes('data-toggler') &&
		timeTypeToggler(toggleType);

	return (
		<ul
			className={`timely-data-toggler flex my-5 container cursor-pointer space-x-4 ${additionalClasses}`}
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
