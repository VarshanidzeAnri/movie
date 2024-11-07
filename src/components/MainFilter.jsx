import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CheckList from "./CheckList";
import { GENRES, LANGUAGES } from "../../data";
import './mainFilter.css'



function MainFilter() {
    const [checked, setChecked] = useState([]);
    const [language, setLanguage] = useState([]);
    const [movieYears, setMovieYears] = useState([]);
    const {pathname} = useLocation()
    const navigate = useNavigate();
    const fromRef = useRef();
    const toRef = useRef();
    const yearRef = useRef();
   

    const currentYear = new Date().getFullYear();
    let years = [];
    for (let i = currentYear; i >= 2000; i--) {
        years.push(i)
    }

    
    function handleGenreSubmit(e){
        e.preventDefault();
        const check = new Set(checked);
        const checkedData = Array.from(check)
        const languageSet = new Set(language);
        const languageData = Array.from(languageSet)
        const yearSet = new Set(movieYears);
        const yearData = Array.from(yearSet)
        let path = `${pathname}?checked=${checkedData.toString()}&year=${yearData.toString()}&from=${fromRef.current.value}&to=${toRef.current.value}&lang=${languageData.toString()}`;
        navigate(path)
        
        
    }



    return (
        <div>
        <form onSubmit={handleGenreSubmit} id="genreForm" className="flex justify-start items-center flex-wrap gap-5 p-5 main-filter  mx-auto ">
            
             <div className="flex flex-col gap-3 lg:flex-row justify-between w-full text-white">

                <div className="overflow-auto h-60 w-80 mx-auto"><CheckList onChacked={setChecked} checked={checked} contType="ჟანრი" data={GENRES} /></div>

                <div className="overflow-auto flex flex-col items-center gap-5 mt-5 lg:mt-0 w-80 lg:w-[30%] h-60 mx-auto">
                        <div className="self-center text-2xl font-bold ">გამოშვების წელი</div>
                        <div className="flex items-center gap-2">
                            <div className="flex  gap-3">
                                <input ref={fromRef} type="number" className="w-[15vw] lg:w-[5vw] bg-stone-300 text-black px-2 outline-none rounded-xl placeholder:text-black/50 placeholder:font-bold" placeholder="დან" />
                            </div>
                            <label>-</label>
                            <div className="flex gap-3">
                                <input ref={toRef} type="number" className="w-[15vw] lg:w-[5vw] bg-stone-300 text-black px-2 outline-none rounded-xl placeholder:text-black/50 placeholder:font-bold" placeholder="მდე" />
                            </div>  
                        </div>  
                        <div className="flex flex-wrap gap-3 ">
                            {years.map((year, i) => (
                                <div key={i} className="checkbox-wrapper-47">
                                
                                <input  onClick={() => setMovieYears([...movieYears, year])} type="checkbox" name={year} checked={year.isChecked} id={`${year}`} />
                                <label  className="text-base lg:text-xs xl:text-base" htmlFor={`${year}`}>{year}</label>
                            </div>
                            ))}
                        </div>
                </div>

                <div className="mt-5 lg:mt-0 overflow-auto w-80 mx-auto"><CheckList onChacked={setLanguage} checked={language} contType="ენა" type='lang' data={LANGUAGES} /></div>
            
            </div>
             <button form="genreForm" className=" w-full bg-[#ff0009] font-bold p-2 rounded-lg text-white" >ძებნა</button>
         </form>
        </div>
    )
}

export default MainFilter
