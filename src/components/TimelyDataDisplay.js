import TimelyDataCard from './TimelyDataCard';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.min.css';

SwiperCore.use([Navigation]);
function TimelyDataDisplay({ timelyData, dataIndexSetter }) {
	return (
		<div className="timely-data-display container overflow-x-scroll mb-5 flex space-x-3">
			<Swiper
				slidesPerView={3}
				spaceBetween={7}
				navigation={window.innerWidth >= 768}
			>
				{timelyData &&
					timelyData.map((data, i) => (
						<SwiperSlide key={`swiper_key_${i}`}>
							<TimelyDataCard
								dataIndexSetter={dataIndexSetter}
								timelyWeatherData={data}
								key={i}
							/>
						</SwiperSlide>
					))}
			</Swiper>
		</div>
	);
}

export default TimelyDataDisplay;
