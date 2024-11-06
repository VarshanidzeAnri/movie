import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import RadioButton from "../../components/RadioButton";
import axiosClient from "../../axios-clinet";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from 'react-select'
import dayjs from "dayjs";
import axios from "axios";

function EditMovie() {
    const {id} = useParams();
    const [movie, setMovie] = useState({})
    
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [actors, setActors] = useState([]);
    const [smallImg, setSmallImg] = useState([])
    const [longImg, setLongImg] = useState([])
    const [release, setRelease] = useState(null)
    const [selectedGenres, setSelectedGenres] = useState([]); 
    const [selectedDirectors, setSelectedDirectors] = useState([]); 
    const [selectedActors, setSelectedActors] = useState([]); 

    const nameRef = useRef();
    const nameEnRef = useRef();
    const descriptionRef = useRef();

    useEffect(() => {
        axiosClient.get('/genres')
        .then(({data}) => {
            data.data.map(data => {
                genres.push({value: data.id, label: data.name})
            })
        })

        axiosClient.get('/directors')
        .then(({data}) => {
            data.data.map(data => {
                directors.push({value: data.id, label: data.name})
            })
        })

        axiosClient.get('/actors')
        .then(({data}) => {
            data.data.map(data => {
                actors.push({value: data.id, label: data.name})
            })
        })

        const defaultGenreArr = [];
        const defaultDirectorArr = [];
        const defaultActorArr = [];
        axiosClient.get(`/movie/${id}`)
        .then(({data}) => {
            setMovie(data.data)
            data.data?.genres.map(genre => defaultGenreArr.push({value: genre.id, label: genre.name}))
            data.data?.directors.map(dir => defaultDirectorArr.push({value: dir.id, label: dir.name}))
            data.data?.actors.map(act => defaultActorArr.push({value: act.id, label: act.name}))
            
        })
        setSmallImg(movie.small_img)
        setLongImg(movie.long_img)
        setSelectedGenres(defaultGenreArr)
        setSelectedDirectors(defaultDirectorArr)
        setSelectedActors(defaultActorArr)
        
    },[genres, directors, actors]);
    
    // console.log(movie)


    const submitForm = (e) => {
        e.preventDefault();
        let genreArr = []
        selectedGenres.map(genre => {
            genreArr.push(genre.value)
        })

        let directorArr = []
        selectedDirectors.map(genre => {
            directorArr.push(genre.value)
        })

        let actorArr = []
        selectedActors.map(genre => {
            actorArr.push(genre.value)
        })

        const data = new FormData()
        data.append('name', nameRef.current.value);
        data.append('name_en', nameEnRef.current.value);
        data.append('release_year', release);
        data.append('small_img', smallImg);
        data.append('long_img', longImg);
        data.append('genre_ids', JSON.stringify(genreArr));
        data.append('director_ids', JSON.stringify(directorArr));
        data.append('actor_ids', JSON.stringify(actorArr));
        data.append('description', descriptionRef.current.value);


        axiosClient.post(`/movie/update/${id}`, data, {params: {'_method': 'PATCH'}})
        .then(() => {
            navigate(`/${id}`)
        });
    }

    return (
        <div className="w-[25vw] mx-auto">
            <form onSubmit={submitForm} className="flex flex-col items-start justify-center my-40">
                <div className="flex justify-center items-center gap-5 mt-10">
                    <div className="flex w-60 flex-col gap-3">
                        <label>პატარა ფოტო (500x700)</label>
                        <input onChange={(e) => setSmallImg(e.target.files[0])} type="file" />
                    </div>
                    <div className="flex flex-col w-60 gap-3 ">
                        <label>დიდი ფოტო (1200x600)</label>
                        <input onChange={(e) => setLongImg(e.target.files[0])} type="file" />
                    </div>
                </div>
                <div className="flex justify-center items-center gap-5 mt-10">
                    <div className="flex flex-col gap-3 w-60">
                        <label>სახელი (ქართულად)</label>
                        <input ref={nameRef} defaultValue={movie.name} className="text-black p-2 rounded-lg" type="text" />
                    </div>
                    <div className="flex flex-col w-60 gap-3">
                        <label>სახელი (ინგლისურად)</label>
                        <input ref={nameEnRef} defaultValue={movie.name_en} className="text-black p-2 rounded-lg" type="text" />
                    </div>
                </div>
                <div className="flex justify-start items-center gap-20 mt-10 ">
                    <div className="flex flex-col w-60 gap-3 ">
                        <label>გამოშვების წელი</label>
                        <div className=''>
                        <LocalizationProvider dateAdapter={AdapterDayjs} > 
                        <DemoContainer components={['DatePicker']} >
                            <DatePicker value={dayjs(movie.year)} label="გამოშვების წელი" className='bg-white' views={['year']}  onChange={(e) => setRelease(e.year())} />
                        </DemoContainer>
                        </LocalizationProvider>
                        </div>
                    </div>
                </div>

                <div className="flex justify-start items-center gap-20 mt-10">
                    <div className="flex flex-col gap-3 min-w-60">
                        <label>ჟანრი</label>
                        <Select
                        onChange={(e) =>  setSelectedGenres(e)}
                        value={selectedGenres.length > 0 && selectedGenres}
                        isMulti
                        name="colors"
                        options={genres}
                        className="basic-multi-select text-black"
                        classNamePrefix="select"
                        />
                    </div>
                </div>

                <div className="flex justify-start items-center gap-20 mt-10">
                    <div className="flex flex-col gap-3 min-w-60">
                        <label>რეჟისორი</label>
                        <Select
                        onChange={(e) => setSelectedDirectors(e)}
                        value={selectedDirectors.length > 0 && selectedDirectors}
                        isMulti
                        name="colors"
                        options={directors}
                        className="basic-multi-select text-black"
                        classNamePrefix="select"
                        />
                    </div>
                </div>
                
                <div className="flex justify-start items-center gap-20 mt-10">
                    <div className="flex flex-col gap-3 min-w-60">
                        <label>მსახიობები</label>
                        <Select
                        onChange={(e) => setSelectedActors(e)}
                        value={selectedActors.length > 0 && selectedActors}
                        isMulti
                        name="colors"
                        options={actors}
                        className="basic-multi-select text-black"
                        classNamePrefix="select"
                        />
                    </div>
                </div>

                <div className="flex justify-start items-center gap-20 mt-10">
                    <div className="flex flex-col gap-3 w-[25vw] ">
                        <label>მოკლე აღწერა</label>
                        <textarea ref={descriptionRef} defaultValue={movie.description}  className='w-full h-40 text-black p-2'></textarea>
                    </div>
                </div>
                <div className='w-[80%] ml-5 bg-red-600 mt-20 p-2 text-center rounded-lg'>
                    <button type='submit' className=''>ატვირთვა</button>
                </div>
            </form>
        </div>
    )
}

export default EditMovie
