import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import './changeSwiper.css'
import { Link } from 'react-router-dom';
import animeImg from './../../public/bg_imgs/anime.jpg';


function MoviesCarousel({data, sectionTitle, link, bgImg}) {
    return (
        <div className='relative'>
        {bgImg && <div style={{backgroundImage: `url(${bgImg})`}} className={` absolute w-full h-72 md:h-[105%] -z-10 opacity-30`}> </div>}
            <div className="w-[90vw] md:w-[90vw] mx-auto movieList mt-14">
                <div className='flex justify-between w-[98%]'>
                    <div className='text-2xl text-[#ff0009] font-bold'>{sectionTitle}</div>
                    {link && <Link to={link} className='bg-[#ff0009] p-2 text-white font-bold rounded-md font-bold'>ყველას ნახვა</Link>}
                    
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
                        <div className='relative'>
                            <Link to={`/${movie.slug}`}><img src={movie.image} className='w-full h-[20vh] sm:h-[30vh] object-cover rounded-lg' /></Link>
                            <div className='absolute bottom-0 w-full bg-zinc-800 opacity-80 rounded-b-lg text-white'>
                                <div className='flex justify-between text-xs lg:text-xl lg:w-[90%] mx-auto '>
                                    <div>GEO</div>
                                    <div className='opacity-30'>RUS</div>
                                    <div>ENG</div>
                                </div>
                            </div>
                            <div className='absolute top-0 right-0 p-1 bg-stone-700 opacity-80 rounded-md text-white'>2024</div>
                        </div>                    
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
