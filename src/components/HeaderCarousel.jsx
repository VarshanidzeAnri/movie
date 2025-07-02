import { Navigation, Pagination, A11y, Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaPlay, FaStar, FaCalendarAlt } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import { MOVIES } from '../../data';
import 'swiper/css/autoplay';
import './changeSwiper.css'
import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

function HeaderCarousel() {
  const {handleMoveTop} = useStateContext();

  return (
    <div className='relative w-full mx-auto mt-[-50px]'>
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{ 
          clickable: true,
          el: '.swiper-pagination-custom',
          bulletClass: 'swiper-pagination-bullet-custom',
          bulletActiveClass: 'active',
        }}
        speed={1000}
        autoplay={{
          delay: 5000,
          // pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}  
        loop={true}
        className="w-full"
      >
        {MOVIES.map(movie => (
          <SwiperSlide key={movie.id} className="relative overflow-hidden">
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>
            
            {/* Image with zoom animation */}
            <div className="w-full h-[90vh] relative overflow-hidden">
              <img 
                src={movie.image} 
                className="w-full h-full object-cover object-center transform transition-transform duration-[10000ms] ease-in-out hover:scale-110" 
                alt={movie.name}
              />
            </div>
            
            {/* Content with animated entrance */}
            <div className="absolute top-1/2 left-[10%] -translate-y-1/2 z-20 max-w-xl animate-fadeInUp">
              {/* Category tag */}
              <span className="inline-block px-4 py-1 bg-red-600 text-white text-sm rounded-full mb-4 font-medium animate-slideInRight">
                {movie.category || "Action"}
              </span>
              
              {/* Movie titles with animation */}
              <h1 className="text-5xl font-bold text-white mb-2 animate-fadeIn">
                {movie.name}
              </h1>
              <h2 className="text-3xl text-gray-300 mb-6 animate-fadeIn animation-delay-200">
                {movie.name_en}
              </h2>
              
              {/* Movie details */}
              <div className="flex items-center gap-5 text-white mb-6 animate-fadeIn animation-delay-300">
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span>{movie.rating || "8.5"}</span>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="text-gray-400 mr-1" />
                  <span>{movie.year || "2023"}</span>
                </div>
                <span className="text-gray-400">{movie.duration || "120 min"}</span>
              </div>
              
              {/* Description with truncation */}
              <p className="text-gray-300 mb-8 line-clamp-3 animate-fadeIn animation-delay-400">
                {movie.description || "A thrilling story of adventure and discovery that will take you on an unforgettable journey through time and space."}
              </p>
              
              {/* Action buttons */}
              <div className="flex gap-4 animate-fadeIn animation-delay-500">
                <Link 
                  onClick={handleMoveTop} 
                  to={`/${movie.slug}`} 
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-600/30"
                >
                  <FaPlay className="mr-2" />
                  <span>Watch Now</span>
                </Link>
                <Link 
                  onClick={handleMoveTop} 
                  to={`/${movie.slug}`} 
                  className="px-6 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
                >
                  Details
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom navigation arrows */}
      <div className="swiper-button-prev-custom absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 flex items-center justify-center text-white cursor-pointer z-30 hover:bg-red-600 transition-all duration-300 backdrop-blur-sm">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </div>
      <div className="swiper-button-next-custom absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 flex items-center justify-center text-white cursor-pointer z-30 hover:bg-red-600 transition-all duration-300 backdrop-blur-sm">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </div>

      {/* Custom pagination dots */}
      <div className="swiper-pagination-custom absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-30"></div>
    </div>
  )
}

export default HeaderCarousel
