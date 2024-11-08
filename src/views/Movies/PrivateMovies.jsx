import { useEffect, useState } from "react";
import axiosClient from "../../axios-clinet";
import MainFilter from "../../components/MainFilter";
import MovieItem from "../../components/MovieItem";

function PrivateMovies() {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        axiosClient.get('/movies/private')
        .then(({data}) => {
            setMovies(data.data);
        })
    })


    return (
        <div className="w-[90vw] md:w-[70vw] mx-auto ">
            {/* <MainFilter /> */}
            <div className="w-full flex justify-start gap-5 flex-wrap mt-20 ">
            {movies.map(movie => <MovieItem key={movie.id} movie={movie} />)}
            </div>
        </div>
    )
}

export default PrivateMovies
