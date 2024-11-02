import { GENRES } from "../../data"
import GenreItem from "./GenreItem"


function Genres({onChacked, checked}) {
    return (
        <div className="p-2 flex flex-wrap gap-2 items-center">
            {GENRES.map(gen => <GenreItem key={gen.id} genre={gen} onChacked={onChacked} checked={checked} />)}
        </div>
    )
}

export default Genres


