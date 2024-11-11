
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MOVIES } from '../../data';
import Comments from '../components/Comments';
import MoviesCarousel from '../components/MoviesCarousel';
import VideoPlayer from '../components/VideoPlayer';
import { useEffect, useState } from 'react';
import axiosClient from '../axios-clinet';
import { connect } from 'videodb';



 function MovieDetail() {


    const conn = connect('sk-Ejk607B3SvPo2vSrim0wBvWdgiNQvNlaMHMXK9byvQA');
    const {id} = useParams();
    const [movie, setMovie] = useState({});
    const [video, setVideo] = useState('')
    const navigate = useNavigate();



    useEffect(() => {
        axiosClient.get(`/movie/${id}`)
        .then(({data}) => setMovie(data.data));


                conn.getCollections().then(coll => {
                    
                    coll[0].getVideo('m-b46fbe56-8c37-41dc-9c9c-b3928395be78')
                    .then(vid => {
                        
                        setVideo(vid.play())
                        // console.log(vid)
                        // // while(video.length ){
                        //     setVideo(vid.meta.playerUrl)
                        // // }
                    })
                });
            // }
                
    }, [])


    const deleteMovie = (e) => {
        e.preventDefault();
        axiosClient.delete(`/movie/delete/${id}`)
        .then(() => {
            navigate('/');
        })
    }

    const updateToPublic = (e) => {
        e.preventDefault();
        axiosClient.patch(`/movie/update/public/${id}`)
        .then(() => {
            window.location.reload();
        })
    }

    const updateToPrivate = (e) => {
        e.preventDefault();
        axiosClient.patch(`/movie/update/private/${id}`)
        .then(() => {
            window.location.reload();
        })
    }
    // {debugger}
    return (
        <div className='pb-20'>
        <div className="w-[90%] lg:w-[70vw] mx-auto flex flex-col gap-5 mb-10">

            <div className="w-full flex justify-start gap-3 mt-5 lg:mt-0">
                <div className="hidden lg:block h-[50vh] w-[30%]"><img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${movie.small_img}`} className=" h-full object-cover rounded-md" /></div>
                {/* <div className="h-[30vh] md:h-[50vh] w-full lg:w-[70%] relative"> */}
                    {/* <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#ff0009] '>ფილმი მალე დაიდება</div> */}
                    {/* <img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${movie.long_img}`} className="w-full h-full object-cover rounded-md" /> */}
                    {/* </div> */}
                <div className="h-[30vh] md:min-h-[70vh] lg:min-h-[50vh] w-full lg:w-full">
                    <VideoPlayer  className='w-full h-full object-cover rounded-md' video={video} />
                </div>
            </div>

            <div className="flex flex-col gap-2 md:gap-3 p-5 pt-2 bg-zinc-800 w-full rounded-md relative">
                {Object.keys(movie).length !== 0 && !movie.access ? <div className='mt-5 text-[#ff0009]'>დაემატება დადასტურების შემდეგ</div> : ''}
                <div className='md:absolute md:top-3 top-5 right-3 flex gap-3 flex-wrap'>
                    <form onClick={movie.access == 1 ? updateToPrivate : updateToPublic} className='bg-[#ff0009] p-3 mt-5 md:mt-0 rounded'>
                        <button type='submit'>{movie.access == 1 ? 'დამალვა' : 'გასაჯაროვება'}</button>
                    </form>
                    
                    <div className='bg-[#ff0009] p-3 mt-5 md:mt-0 rounded'>
                        <Link to={`/edit/${movie.id}`}>რედაქტირება</Link>
                    </div>
                    <form onClick={deleteMovie} className='bg-[#ff0009] p-3 mt-5 md:mt-0 rounded'>
                        <button type='submit'>წაშლა</button>
                    </form>
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
                <Comments movieId={id} />
                <div>
                </div>
        </div>
                <MoviesCarousel data={MOVIES} sectionTitle='მსგავსი ფილმები'  />
        </div>
    )
}

export default MovieDetail
