import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import './changeSwiper.css'
import { Link } from 'react-router-dom';

function MoviesCarousel({data, sectionTitle, link, bgImg}) {
    return (
        <div className='relative'>
        {bgImg && <div className={` bg-[url('/bg_imgs/${bgImg}')] absolute w-full h-72 md:h-[105%] -z-10 opacity-30`}> </div>}
            <div className="w-[90vw] md:w-[70vw] mx-auto movieList mt-14 ">
                <div className='flex justify-between w-[98%] '>
                    <div className='text-2xl'>{sectionTitle}</div>
                    <Link to={link}>ყველას ნახვა</Link>
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
                    onSlideChange={ (swiper) => console.log(swiper.activeIndex)}
                    slidesPerGroup={3}
        >
                    {data.map(movie => (
                    <SwiperSlide key={movie.id}>
                    <img src={movie.image} className='w-full h-[20vh] md:h-[30vh] object-cover rounded-lg' />
                    <div className='ml-1'>
                        <div className='text-xl'>{movie.name}</div>
                        <div>{movie.name_en}</div>
                    </div>
                    </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default MoviesCarousel
