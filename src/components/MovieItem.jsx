import { Link } from 'react-router-dom'
import './movieItem.css'
import { useState } from 'react';
import { HiOutlinePlayCircle } from "react-icons/hi2";
import { useStateContext } from '../contexts/ContextProvider';


function MovieItem({movie}) {
    const [isHovered, setIsHovered] = useState(false)
    const {handleMoveTop} = useStateContext();

    return (
        <div key={movie.id} className="single-movie-item-ddss mt-10">
                            <div className='relative'>
                            <Link onClick={handleMoveTop} to={`/${movie.id}`}>
                            <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={`text-7xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100  ${!isHovered && 'hidden'} `}><HiOutlinePlayCircle /></div>

                            <img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${movie.small_img}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={`w-full h-[20vh] sm:h-[30vh] object-cover rounded-lg ${isHovered && 'border-2 border-[#ff0009]'}`} />
                            </Link>
                            <div className='absolute bottom-0 w-full bg-black opacity-70 rounded-b-lg text-white'>
                                <div className='flex justify-between text-xs lg:text-xl lg:w-[90%] mx-auto '>
                                    <div>GEO</div>
                                    <div className='opacity-30'>RUS</div>
                                    <div>ENG</div>
                                </div>
                            </div>
                            <div className='absolute top-0 right-0 p-1 bg-black opacity-70 rounded-md text-white'>2024</div>
                        </div>             <div className='ml-1'>
                <div className='text-xl'>{movie.name}</div>
                <div>{movie.name_en}</div>
            </div>
        </div>  
    )
}

export default MovieItem




