import { MOVIES } from "../../data"
import SingleMovie from "../components/SingleMovie"

function Movies() {
    return (
        <div className="w-[90vw] md:w-[70vw] mx-auto flex justify-start gap-5 flex-wrap">
            {MOVIES.map(movie => <SingleMovie key={movie.id} movie={movie} />)}
        </div>
    )
}

export default Movies
