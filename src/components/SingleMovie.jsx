import './singleMovie.css'

function SingleMovie({movie}) {
    return (
        <div key={movie.id} className="single-movie-item-ddss">
            <img src={movie.image} className='w-full h-[20vh] md:h-[30vh] object-cover mt-5 rounded-lg' />
            <div className='ml-1'>
                <div className='text-xl'>{movie.name}</div>
                <div>{movie.name_en}</div>
            </div>
        </div>  
    )
}

export default SingleMovie
