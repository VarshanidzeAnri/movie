
import { Link, useParams } from 'react-router-dom';
import { MOVIES } from '../../data';
import Comments from '../components/Comments';
import MoviesCarousel from '../components/MoviesCarousel';
import VideoPlayer from '../components/VideoPlayer';
import { useEffect, useState } from 'react';
import axiosClient from '../axios-clinet';

function MovieDetail() {
    const {id} = useParams();
    const [movie, setMovie] = useState({});

    useEffect(() => {
        axiosClient.get(`/movie/${id}`)
        .then(({data}) => setMovie(data.data));
    }, [])

    console.log(movie)

    

    return (
        <div className='pb-20'>
        <div className="w-[90%] lg:w-[70vw] mx-auto flex flex-col gap-5 mb-10">

            <div className="w-full flex justify-start gap-3 mt-5 lg:mt-0">
                <div className="hidden lg:block h-[50vh] w-[30%]"><img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${movie.small_img}`} className=" h-full object-cover rounded-md" /></div>
                <div className="h-[30vh] md:h-[50vh] w-full lg:w-[70%]"><img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${movie.long_img}`} className="w-full h-full object-cover rounded-md" /></div>
                {/* <div className="h-[30vh] md:min-h-[70vh] lg:min-h-[50vh] w-full lg:w-full">
                    <VideoPlayer className='w-full h-full object-cover rounded-md' />
                </div> */}
            </div>

            <div className="flex flex-col gap-2 md:gap-3 p-5 pt-2 bg-zinc-800 w-full rounded-md relative">
                {Object.keys(movie).length !== 0 && !movie.access ? <div className='mt-5 text-[#ff0009]'>დაემატება დადასტურების შემდეგ</div> : ''}
                <div className='md:absolute md:top-3 top-5 right-3 flex gap-3'>
                    <div className='bg-[#ff0009] p-3 mt-5 md:mt-0'>
                        <Link to={`/edit/${movie.id}`}>რედაქტირება</Link>
                    </div>
                </div>
                    <div className='w-[70%] break-all'>
                        <div className="text-2xl mt-2">{movie.name}</div>
                        <div className="text-xl mt-2">{movie.name_en}</div>
                    </div>
                    <div className="md:hidden w-full h-32"><img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${movie.small_img}`} className=" h-full object-cover rounded-md" /></div>
                    <div className="flex justify-start gap-2 mt-1">
                        <div className="hidden md:block lg:hidden w-full"><img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${movie.small_img}`} className=" h-full object-cover rounded-md" /></div>
                        <div className="flex flex-col justify-start gap-3 text-sm">
                            <div>წელი: {movie.release_year}</div>
                            <div className='flex gap-2'>
                                <span>ჟანრი:</span> 
                                <div className='flex gap-2'>
                                    {movie.genres?.map((genre, i) => (
                                        <div key={genre.id}>
                                            {genre.name}{i < movie.genres.length -1 ? ', ' : ''}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <span>რეჟისორი:</span> 
                                <div className='flex gap-2'>
                                    {movie.directors?.map((dir, i) => (
                                        <div key={dir.id}>
                                            {dir.name}{i < movie.directors.length -1 ? ', ' : ''}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <span>მსახიობები:</span> 
                                <div className='flex gap-2'>
                                    {movie.actors?.map((act, i) => (
                                        <div key={act.id}>
                                            {act.name}{i < movie.actors.length -1 ? ', ' : ''}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full text-wrap text-sm flex flex-col gap-2 ">
                        <div>მოკლე აღწერა:</div>
                        <div>{movie.description}</div>
                    </div>
                </div>
                <Comments />
                <div>
                </div>
        </div>
                <MoviesCarousel data={MOVIES} sectionTitle='მსგავსი ფილმები'  />
        </div>
    )
}

export default MovieDetail
