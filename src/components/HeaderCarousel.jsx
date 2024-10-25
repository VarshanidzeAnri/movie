// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { MOVIES } from '../../data';




function HeaderCarousel() {
    return (
      <div className='w-[90vw] md:w-[70vw] mx-auto'>
      <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      
      onSwiper={(swiper) => console.log(swiper)}
      loop
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
