import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CheckList from "./CheckList";
import { GENRES, LANGUAGES } from "../../data";
import './mainFilter.css'

function MainFilter() {
    const [checked, setChecked] = useState([]);
    const [language, setLanguage] = useState([]);
    const [movieYears, setMovieYears] = useState([]);
    const [openDropdowns, setOpenDropdowns] = useState({
        movie: false,
        genre: false,
        year: false,
        language: false
    });
    const {pathname} = useLocation()
    const navigate = useNavigate();
    const fromRef = useRef();
    const toRef = useRef();
    const movieNameRef = useRef();
   

    const currentYear = new Date().getFullYear();
    let years = [];
    for (let i = currentYear; i >= 2000; i--) {
        years.push(i)
    }

    
    const toggleDropdown = (dropdown) => {
        setOpenDropdowns(prev => ({
            ...prev,
            [dropdown]: !prev[dropdown]
        }));
    };

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
        <div className="filter-container bg-black">
            <form onSubmit={handleGenreSubmit} id="genreForm" className="p-4 main-filter mx-auto">
                <div className="flex flex-wrap lg:flex-nowrap lg:flex-row justify-between items-center gap-4 mb-4 mt-5 lg:mt-0 w-full">
                    {/* Movie Name Input */}
                    <div className="w-full lg:w-1/5">
                        <input 
                            ref={movieNameRef} 
                            type="text" 
                            className="w-full bg-stone-300 text-black px-3 py-2 h-10 outline-none rounded-lg placeholder:text-black/50" 
                            placeholder="ფილმის სახელი" 
                        />
                    </div>

                    {/* Genre Dropdown */}
                    <div className="filter-dropdown w-full lg:w-1/5">
                        <button 
                            type="button"
                            onClick={() => toggleDropdown('genre')} 
                            className="w-full bg-[#ff0009] text-white font-bold p-2 rounded-lg flex justify-between items-center h-10"
                        >
                            <span>ჟანრი</span>
                            <span>{openDropdowns.genre ? '▲' : '▼'}</span>
                        </button>
                        {openDropdowns.genre && (
                            <div className="dropdown-content bg-black mt-2 p-3 rounded-lg border border-gray-800">
                                <div className="max-h-64 overflow-auto">
                                    <CheckList onChacked={setChecked} checked={checked} contType="ჟანრი" data={GENRES} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Year Dropdown */}
                    <div className="filter-dropdown w-full lg:w-1/5">
                        <button 
                            type="button"
                            onClick={() => toggleDropdown('year')} 
                            className="w-full bg-[#ff0009] text-white font-bold p-2 rounded-lg flex justify-between items-center h-10"
                        >
                            <span>გამოშვების წელი</span>
                            <span>{openDropdowns.year ? '▲' : '▼'}</span>
                        </button>
                        {openDropdowns.year && (
                            <div className="dropdown-content bg-black mt-2 p-3 rounded-lg border border-gray-800">
                                <div className="flex items-center justify-center gap-2 mb-3">
                                    <input ref={fromRef} type="number" className="w-20 bg-stone-300 text-black px-2 outline-none rounded-xl placeholder:text-black/50 placeholder:font-bold" placeholder="დან" />
                                    <span className="text-white">-</span>
                                    <input ref={toRef} type="number" className="w-20 bg-stone-300 text-black px-2 outline-none rounded-xl placeholder:text-black/50 placeholder:font-bold" placeholder="მდე" />
                                </div>
                                <div className="flex flex-wrap gap-2 max-h-48 overflow-auto justify-center">
                                    {years.map((year, i) => (
                                        <div 
                                            key={i} 
                                            className={`filter-button ${movieYears.includes(year) ? 'selected' : ''}`}
                                            onClick={() => setMovieYears(prev => 
                                                prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
                                            )}
                                        >
                                            {year}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Language Dropdown */}
                    <div className="filter-dropdown w-full lg:w-1/5">
                        <button 
                            type="button"
                            onClick={() => toggleDropdown('language')} 
                            className="w-full bg-[#ff0009] text-white font-bold p-2 rounded-lg flex justify-between items-center h-10"
                        >
                            <span>ენა</span>
                            <span>{openDropdowns.language ? '▲' : '▼'}</span>
                        </button>
                        {openDropdowns.language && (
                            <div className="dropdown-content bg-black mt-2 p-3 rounded-lg border border-gray-800">
                                <div className="max-h-64 overflow-auto">
                                    <CheckList onChacked={setLanguage} checked={language} contType="ენა" type='lang' data={LANGUAGES} />
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Search Button */}
                    <div className="w-full lg:w-1/5">
                        <button form="genreForm" className="w-full bg-[#ff0009] font-bold p-2 rounded-lg text-white h-10">ძებნა</button>
                    </div>
                </div>
            </form>
            
            <style jsx>{`
                .filter-dropdown {
                    position: relative;
                }
                
                .dropdown-content {
                    position: absolute;
                    width: 100%;
                    z-index: 10;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                }
                
                /* Unified button styling for all filter items */
                .filter-button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 5px 10px;
                    background-color: transparent;
                    border: 1px solid #5a5a5a;
                    color: white;
                    border-radius: 4px;
                    cursor: pointer;
                    margin: 4px;
                    min-width: 50px;
                    font-size: 14px;
                    transition: all 0.2s;
                }
                
                .filter-button:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                }
                
                .filter-button.selected {
                    background-color: #ff0009;
                    border-color: #ff0009;
                }
                
                @media (max-width: 1023px) {
                    .dropdown-content {
                        position: relative;
                    }
                }
            `}</style>
        </div>
    )
}

export default MainFilter

