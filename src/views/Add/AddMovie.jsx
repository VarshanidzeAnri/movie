import Select from 'react-select'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useRef, useState } from 'react';
import axiosClient from '../../axios-clinet';
import RadioButton from '../../components/RadioButton';
import { useNavigate } from 'react-router-dom';


function AddMovie() {
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [actors, setActors] = useState([]);
    const [movieType, setMovieType] = useState(0);
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
        
    },[genres, directors, actors]);


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
        data.append('type', movieType);
        data.append('name', nameRef.current.value);
        data.append('name_en', nameEnRef.current.value);
        data.append('release_year', release);
        data.append('small_img', smallImg);
        data.append('long_img', longImg);
        data.append('genre_ids', JSON.stringify(genreArr));
        data.append('director_ids', JSON.stringify(directorArr));
        data.append('actor_ids', JSON.stringify(actorArr));
        data.append('description', descriptionRef.current.value);

        axiosClient.post('/movie/store', data)
        .then(({data}) => {
            navigate(`/${data.id}`)
        });
    }

    return (
        <div className="w-[90vw] lg:w-[25vw] mx-auto">
            <form onSubmit={submitForm} className="flex flex-col items-center lg:items-start justify-center my-40">
                <div className="flex justify-around items-center gap-5 mt-10 text-2xl w-full">
                    <RadioButton onChangeType={setMovieType} />
                </div>

                <div className="flex flex-col lg:flex-row justify-center items-center gap-5 mt-20">
                    <div className="flex  w-60 flex-col gap-3">
                        <label>პატარა ფოტო (500x700)</label>
                        <input onChange={(e) => setSmallImg(e.target.files[0])} type="file" />
                    </div>
                    <div className="flex flex-col w-60 gap-3 ">
                        <label>დიდი ფოტო (1200x600)</label>
                        <input onChange={(e) => setLongImg(e.target.files[0])}   type="file" />
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-center items-center gap-5 mt-10">
                    <div className="flex flex-col gap-3 w-60">
                        <label>სახელი (ქართულად)</label>
                        <input ref={nameRef} className="text-black p-2 rounded-lg" type="text" />
                    </div>
                    <div className="flex flex-col w-60 gap-3">
                        <label>სახელი (ინგლისურად)</label>
                        <input ref={nameEnRef} className="text-black p-2 rounded-lg" type="text" />
                    </div>
                </div>
                <div className="flex justify-start items-center gap-20 mt-10 ">
                    <div className="flex flex-col w-60 gap-3 ">
                        <label>გამოშვების წელი</label>
                        <div className=''>
                        <LocalizationProvider dateAdapter={AdapterDayjs} > 
                        <DemoContainer components={['DatePicker']} >
                            <DatePicker  label="გამოშვების წელი" className='bg-white' views={['year']}  onChange={(e) => setRelease(e.year())} />
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
                        isMulti
                        name="colors"
                        options={actors}
                        className="basic-multi-select text-black"
                        classNamePrefix="select"
                        />
                    </div>
                </div>

                <div className="flex justify-start items-center gap-20 mt-10">
                    <div className="flex flex-col gap-3 w-[80vw] md:w-[40vw] lg:w-[25vw] ">
                        <label>მოკლე აღწერა</label>
                        <textarea ref={descriptionRef}  className='w-full h-40 text-black p-2'></textarea>
                    </div>
                </div>
                <div className='w-[80%] ml-5 bg-red-600 mt-20 p-2 text-center rounded-lg'>
                    <button type='submit' className=''>ატვირთვა</button>
                </div>
            </form>
        </div>
    )
}

export default AddMovie
