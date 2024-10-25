import { MOVIES } from "../../data"
import MovieItem from "../components/MovieItem"

function Serials() {
    return (
        <div className="w-[90vw] md:w-[70vw] mx-auto flex justify-start gap-5 flex-wrap">
            {MOVIES.map(movie => <MovieItem key={movie.id} movie={movie} />)}
        </div>
    )
}

export default Serials
