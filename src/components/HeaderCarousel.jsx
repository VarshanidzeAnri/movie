import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { MOVIES } from '../../data';
import 'swiper/css/autoplay';
import './changeSwiper.css'

function HeaderCarousel() {
    return (
      <div className='w-full md:w-[70vw] mx-auto '>
        <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        speed={1000}
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}  
        loop={true}
        

      >
        {MOVIES.map(movie => (
        <SwiperSlide key={movie.id}>
          <img src={movie.image} className='w-full h-[30vh] md:h-[70vh] object-cover' />
        </SwiperSlide>
        ))}

      </Swiper>
    </div>
    )
}

export default HeaderCarousel
