import { Link } from 'react-router-dom'
import './movieItem.css'

function MovieItem({movie}) {
    return (
        <div key={movie.id} className="single-movie-item-ddss">
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
                        </div>             <div className='ml-1'>
                <div className='text-xl'>{movie.name}</div>
                <div>{movie.name_en}</div>
            </div>
        </div>  
    )
}

export default MovieItem




