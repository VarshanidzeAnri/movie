import { MOVIES } from "../../data"
import MainFilter from "../components/MainFilter"
import MovieItem from "../components/MovieItem"

function Serials() {
    return (
        <div className="w-[90vw] md:w-[70vw] mx-auto ">
            <MainFilter />
            <div className="w-full flex justify-start gap-5 flex-wrap mt-20 ">
            {MOVIES.map(movie => <MovieItem key={movie.id} movie={movie} />)}
            </div>
     </div>
    )
}

export default Serials
