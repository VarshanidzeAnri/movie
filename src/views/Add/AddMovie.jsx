import Select from 'react-select'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import axiosClient from '../../axios-clinet';


function AddMovie() {
    const [genres, setGenres] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [actors, setActors] = useState([]);

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

    return (
        <div className="w-[30vw] mx-auto">
            <form className="flex flex-col items-start justify-center my-40">
                <div className="flex justify-center items-center gap-5">
                    <div className="flex w-60 flex-col gap-3">
                        <label>პატარა ფოტო (500x700)</label>
                        <input  type="file" />
                    </div>
                    <div className="flex flex-col w-60 gap-3 ">
                        <label>დიდი ფოტო (1200x600)</label>
                        <input  type="file" />
                    </div>
                </div>
                <div className="flex justify-center items-center gap-5 mt-10">
                    <div className="flex flex-col gap-3 w-60">
                        <label>სახელი (ქართულად)</label>
                        <input className="text-black p-2 rounded-lg" type="text" />
                    </div>
                    <div className="flex flex-col w-60 gap-3">
                        <label>სახელი (ინგლისურად)</label>
                        <input className="text-black p-2 rounded-lg" type="text" />
                    </div>
                </div>
                <div className="flex justify-start items-center gap-20 mt-10 ">
                    <div className="flex flex-col w-60 gap-3 ">
                        <label>გამოშვების წელი</label>
                        <div className=''>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label="გამოშვების წელი" className='bg-white' format='DD/MM/YYYY' />
                        </DemoContainer>
                        </LocalizationProvider>
                        </div>
                    </div>
                </div>

                <div className="flex justify-start items-center gap-20 mt-10">
                    <div className="flex flex-col gap-3 min-w-60">
                        <label>ჟანრი</label>
                        <Select
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
                        <textarea  className='w-full h-40 text-black p-2'></textarea>
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
