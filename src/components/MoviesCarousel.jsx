import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import './changeSwiper.css'
import { Link } from 'react-router-dom';
import MovieCarouselItem from './MovieCarouselItem';


function MoviesCarousel({data, sectionTitle, link, bgImg}) {
    function handleLinkClick() {
        window.scrollTo({ top: 0 });
      }
    return (
        <div className='relative '>
        {bgImg && <div style={{backgroundImage: `url(${bgImg})`}} className={`absolute w-full h-72 md:h-[105%] -z-10 opacity-30`}> </div>}
            <div className="w-[90vw] md:w-[90vw] mx-auto movieList mt-14">
                <div className='flex justify-between w-[98%]'>
                    <div className='text-2xl text-[#ff0009] font-bold'>{sectionTitle}</div>
                    {link && <Link onClick={handleLinkClick} to={link} className='bg-[#ff0009] p-2 text-white font-bold rounded-md '>ყველას ნახვა</Link>}
                    
                </div>
                    <Swiper className='mt-7 md:mt-5'
                    modules={[Navigation, Pagination, A11y]}
                    spaceBetween={50}
                    breakpoints={{
                        0: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                        1440: {
                            slidesPerView: 6
                        }
                    }}
                    navigation
                    longSwipesRatio={100}
                    
                    slidesPerGroup={3}
        >
                    {data.map(movie => (
                    <SwiperSlide key={movie.id}>
                        <MovieCarouselItem movie={movie} />
                    </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default MoviesCarousel
