import { useState } from "react";

function MainDataCard({ mainData }) {
	return (
		<section class="main-data-card">
			<pre className="current-location">{JSON.stringify(mainData, undefined, 2)}</pre>
		</section>
	);
}

export default MainDataCard;
