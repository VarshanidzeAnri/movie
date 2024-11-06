import { useEffect, useState } from "react";
import { MOVIES } from "../../data";
import HeaderCarousel from "../components/HeaderCarousel";
import MoviesCarousel from "../components/MoviesCarousel";
import animeImg from './../../public/bg_imgs/anime.jpg';
import axiosClient from "../axios-clinet";


function Dashboard() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axiosClient.get('/movies')
        .then(({data}) => setMovies(data.data))
    }, [])


    return (
        <div  className="mb-20">
            <div>
                <HeaderCarousel />
            </div>
            <div className="mt-6">
                <MoviesCarousel data={movies} sectionTitle='ფილმები' link='/movies' />
                {/* <MoviesCarousel data={MOVIES} sectionTitle='სერიალები' link='/serials' />
                <MoviesCarousel data={MOVIES} sectionTitle='მულტფილმები' link='/movies' />
                <MoviesCarousel data={MOVIES} sectionTitle='ანიმეები' link='/animes' bgImg={animeImg} /> */}
            </div>
        </div>
    )
}

export default Dashboard
