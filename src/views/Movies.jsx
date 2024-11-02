import MovieItem from "../components/MovieItem"

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { MOVIES } from '../../data';
import 'swiper/css/autoplay';
import GenresForm from "../components/GenresForm";


function Movies() {
    return (
        <div className="w-[90vw] md:w-[70vw] mx-auto ">
            <GenresForm />
            <div className="w-full flex justify-start gap-5 flex-wrap mt-20 ">
            {MOVIES.map(movie => <MovieItem key={movie.id} movie={movie} />)}
            </div>
        </div>
    )
}

export default Movies
