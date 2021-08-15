import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.min.css';

SwiperCore.use([Navigation]);

function Swiper() {
	return (
		<Swiper>
			<SwiperSlide>Swiper 1</SwiperSlide>
			<SwiperSlide>Swiper 2</SwiperSlide>
			<SwiperSlide>Swiper 3</SwiperSlide>
			<SwiperSlide>Swiper 4</SwiperSlide>
			<SwiperSlide>Swiper 5</SwiperSlide>
		</Swiper>
	);
}
