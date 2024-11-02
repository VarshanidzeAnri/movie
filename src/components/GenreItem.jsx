import './genreItem.css'

function GenreItem({genre, onChacked, checked}) {
    return (
        <div onClick={() => onChacked([...checked, genre.id])} className="checkbox-wrapper-47">
            <input type="checkbox" name={genre.id} checked={genre.isChecked} id={`genre-${genre.id}`} />
            <label htmlFor={`genre-${genre.id}`}>{genre.name}</label>
        </div>
    )
}

export default GenreItem
