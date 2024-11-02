import { useState } from "react";
import Genres from "./Genres"
import { Navigate, redirect, useLocation, useNavigate, useParams } from "react-router-dom";

function GenresForm() {
    const [checked, setChecked] = useState([]);
    const {pathname} = useLocation()
    const navigate = useNavigate();
    function handleGenreSubmit(e){
        e.preventDefault();
        const check = new Set(checked);
        const checkedData = Array.from(check)
        let path = `${pathname}?checked=${checkedData.toString()}`;
        navigate(path)
    }

    return (
        <div>
        <form onSubmit={handleGenreSubmit} id="genreForm" className="flex justify-start items-center flex-wrap gap-5 p-5">
             <Genres onChacked={setChecked} checked={checked} />
         </form>
             <button form="genreForm" className="w-full bg-green-500 p-2 rounded-lg text-white" >ძებნა</button>
        </div>
    )
}

export default GenresForm
