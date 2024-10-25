import { MOVIES } from "../../data";
import HeaderCarousel from "../components/HeaderCarousel";
import MoviesCarousel from "../components/MoviesCarousel";


function Dashboard() {
    return (
        <div  className="mb-20">
            <div>

            <HeaderCarousel />
            </div>
            <div className="mt-6">
                
                <MoviesCarousel data={MOVIES} sectionTitle='ფილმები' link='/movies' />
                <MoviesCarousel data={MOVIES} sectionTitle='სერიალები' link='/serials' />
                <MoviesCarousel data={MOVIES} sectionTitle='მულტფილმები' link='/movies' />
                <MoviesCarousel data={MOVIES} sectionTitle='ანიმეები' link='/animes' bgImg='anime.jpg' />
            </div>
        </div>
    )
}

export default Dashboard
