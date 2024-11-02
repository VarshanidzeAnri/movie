import { MOVIES } from "../../data"
import Genres from "../components/Genres"
import GenresForm from "../components/GenresForm"
import MovieItem from "../components/MovieItem"

function Animes() {
    return (
        <div className="w-[90vw] md:w-[70vw] mx-auto ">
            <GenresForm />
            <div className="w-full flex justify-start gap-5 flex-wrap mt-20 ">
            {MOVIES.map(movie => <MovieItem key={movie.id} movie={movie} />)}
            </div>
     </div>
    )
}

export default Animes
