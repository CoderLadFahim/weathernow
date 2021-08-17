import { useState, useEffect } from 'react';
import TimelyDataCard from './TimelyDataCard';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.min.css';

SwiperCore.use([Navigation]);

function TimelyDataCarousel({ timelyData, dataIndexSetter }) {
	// Setting the slides per view from JS
	const [innerWidth, setInnerWidth] = useState(window.innerWidth);

	// updating the innerWidth as horizontal screen size increases
	useEffect(() => {
		window.addEventListener(
			'resize',
			({ target: { innerWidth: screenSizeHori } }) =>
				setInnerWidth(screenSizeHori)
		);
	}, []);

	// calcualting the approriate slide count for horizontal screen size
	const slidesPerView = (() => {
		if (innerWidth >= 1536) return 5;
		if (innerWidth >= 1280) return 4;
		if (innerWidth >= 1024) return 7;
		if (innerWidth >= 768) return 5;
		if (innerWidth >= 640 || innerWidth >= 540) return 4;
		if (innerWidth <= 414) return 3;
	})();

	return (
		<div className="timely-data-display container mb-5 flex space-x-3">
			<Swiper
				slidesPerView={slidesPerView}
				// spaceBetween={spaceBetween}
				navigation={window.innerWidth >= 1024}
			>
				{timelyData &&
					timelyData.map((data, i) => (
						<SwiperSlide key={`swiper_key_${i}`}>
							<TimelyDataCard
								dataIndexSetter={() => dataIndexSetter(i)}
								timelyWeatherData={data}
								key={i}
							/>
						</SwiperSlide>
					))}
			</Swiper>
		</div>
	);
}

export default TimelyDataCarousel;
