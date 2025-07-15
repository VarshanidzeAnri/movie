import Select from 'react-select'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useRef, useState } from 'react';
import axiosClient from '../../axios-clinet';
import RadioButton from '../../components/RadioButton';
import { useNavigate } from 'react-router-dom';
import { RiFileUploadLine, RiVideoUploadLine, RiCloseLine, RiVideoLine, RiAddLine, RiDeleteBin7Line, RiEdit2Line } from "react-icons/ri";
import { motion, AnimatePresence } from 'framer-motion';

// Custom styles for react-select
const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '0.5rem',
    padding: '3px',
    borderColor: state.isFocused ? '#4f46e5' : '#d1d5db',
    boxShadow: state.isFocused ? '0 0 0 1px #4f46e5' : 'none',
    '&:hover': {
      borderColor: state.isFocused ? '#4f46e5' : '#9ca3af',
    }
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#4f46e5',
    borderRadius: '0.25rem',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'white',
    fontWeight: '500',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'white',
    ':hover': {
      backgroundColor: '#6366f1',
      color: 'white',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#4f46e5' : state.isFocused ? '#e0e7ff' : null,
    color: state.isSelected ? 'white' : '#1f2937',
    ':active': {
      backgroundColor: '#4f46e5',
      color: 'white'
    }
  })
};

function AddMovie() {
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [actors, setActors] = useState([]);
    const [movieType, setMovieType] = useState(0);
    const [smallImg, setSmallImg] = useState('')
    const [longImg, setLongImg] = useState('')
    const [release, setRelease] = useState(null)
    const [selectedGenres, setSelectedGenres] = useState([]); 
    const [selectedDirectors, setSelectedDirectors] = useState([]); 
    const [selectedActors, setSelectedActors] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    
    // Video states
    const [movieVideo, setMovieVideo] = useState(null);
    const [episodes, setEpisodes] = useState([]);
    const [episodeTitle, setEpisodeTitle] = useState('');
    const [episodeNumber, setEpisodeNumber] = useState('');
    const [episodeVideo, setEpisodeVideo] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null);
    const [episodeError, setEpisodeError] = useState('');
    
    const nameRef = useRef();
    const nameEnRef = useRef();
    const descriptionRef = useRef();
    const movieVideoRef = useRef();
    const episodeVideoRef = useRef();

    // Explicitly set the movieType after component mount to fix double-click issue
    useEffect(() => {
        // Force radio button to update after mount
        const timer = setTimeout(() => {
            setMovieType(prevType => prevType);
        }, 100);
        
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            axiosClient.get('/genres'),
            axiosClient.get('/directors'),
            axiosClient.get('/actors')
        ]).then(([genresRes, directorsRes, actorsRes]) => {
            setGenres(genresRes.data.data.map(item => ({value: item.id, label: item.name})));
            setDirectors(directorsRes.data.data.map(item => ({value: item.id, label: item.name})));
            setActors(actorsRes.data.data.map(item => ({value: item.id, label: item.name})));
            setIsLoading(false);
        }).catch(error => {
            console.error("Error loading data:", error);
            setIsLoading(false);
        });
    }, []);

    // Handler for movie video selection
    const handleMovieVideoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setMovieVideo(e.target.files[0]);
        }
    };

    // Handler for episode video selection
    const handleEpisodeVideoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setEpisodeVideo(e.target.files[0]);
        }
    };

    // Handle adding or updating an episode
    const handleEpisodeAction = () => {
        // Validation
        if (!episodeTitle.trim() || !episodeNumber || !episodeVideo) {
            setEpisodeError('გთხოვთ შეავსოთ ყველა ველი და აირჩიოთ ვიდეო');
            return;
        }
        
        setEpisodeError('');
        
        if (editingIndex !== null) {
            // Update existing episode
            const updatedEpisodes = [...episodes];
            updatedEpisodes[editingIndex] = {
                title: episodeTitle,
                episode_number: episodeNumber,
                video: episodeVideo
            };
            setEpisodes(updatedEpisodes);
            setEditingIndex(null);
        } else {
            // Add new episode
            setEpisodes([
                ...episodes, 
                {
                    title: episodeTitle,
                    episode_number: episodeNumber,
                    video: episodeVideo
                }
            ]);
        }
        
        // Reset form
        setEpisodeTitle('');
        setEpisodeNumber('');
        setEpisodeVideo(null);
        if (episodeVideoRef.current) {
            episodeVideoRef.current.value = '';
        }
    };

    // Handle editing an episode
    const handleEditEpisode = (index) => {
        const episode = episodes[index];
        setEpisodeTitle(episode.title);
        setEpisodeNumber(episode.episode_number);
        setEpisodeVideo(episode.video);
        setEditingIndex(index);
    };

    // Handle deleting an episode
    const handleDeleteEpisode = (index) => {
        const updatedEpisodes = [...episodes];
        updatedEpisodes.splice(index, 1);
        setEpisodes(updatedEpisodes);
        
        // Reset form if editing the deleted episode
        if (editingIndex === index) {
            setEpisodeTitle('');
            setEpisodeNumber('');
            setEpisodeVideo(null);
            setEditingIndex(null);
            if (episodeVideoRef.current) {
                episodeVideoRef.current.value = '';
            }
        } else if (editingIndex !== null && editingIndex > index) {
            // Adjust editing index if necessary
            setEditingIndex(editingIndex - 1);
        }
    };
    
    // Format file size
    const formatFileSize = (bytes) => {
        if (!bytes) return '0 B';
        const units = ['B', 'KB', 'MB', 'GB'];
        let size = bytes;
        let unitIndex = 0;
        
        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }
        
        return `${size.toFixed(1)} ${units[unitIndex]}`;
    };

    const submitForm = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const data = new FormData()
        data.append('type', movieType);
        data.append('name', nameRef.current.value);
        data.append('name_en', nameEnRef.current.value);
        data.append('release_year', release);
        data.append('small_img', smallImg);
        data.append('long_img', longImg);
        data.append('genre_ids', JSON.stringify(selectedGenres.map(genre => genre.value)));
        data.append('director_ids', JSON.stringify(selectedDirectors.map(director => director.value)));
        data.append('actor_ids', JSON.stringify(selectedActors.map(actor => actor.value)));
        data.append('description', descriptionRef.current.value);
        
        // Append video data based on content type
        if (movieType === 0) { // Movie
            if (movieVideo) {
                data.append('video', movieVideo);
            }
        } else { // TV Series
            // Prepare episode data for backend
            const episodeData = episodes.map((episode, index) => ({
                title: episode.title,
                episode_number: episode.episode_number
            }));
            
            data.append('episodes', JSON.stringify(episodeData));
            
            // Append episode videos separately
            episodes.forEach((episode, index) => {
                data.append(`episode_videos[${index}]`, episode.video);
            });
        }

        axiosClient.post('/movie/store', data)
        .then(({data}) => {
            setIsLoading(false);
            navigate(`/${data.id}`)
        }).catch((error) => {
            console.error('Error submitting form:', error);
            setIsLoading(false);
        });
    }

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="w-[90vw] lg:w-[50vw] mx-auto">
            <motion.form 
                onSubmit={submitForm} 
                className="flex flex-col items-center justify-center my-16 pb-20"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1 
                    variants={itemVariants}
                    className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                >
                    ფილმის დამატება
                </motion.h1>
                
                <motion.div 
                    variants={itemVariants} 
                    className="bg-gradient-to-r from-gray-800 to-gray-900 p-5 rounded-xl shadow-xl mb-10 w-full"
                >
                    <h2 className="text-gray-300 mb-3 font-medium text-center">ტიპი</h2>
                    <div className="flex justify-around items-center gap-5 text-2xl w-full">
                        <RadioButton onChangeType={setMovieType} initialValue={movieType} />
                    </div>
                </motion.div>

                <motion.div 
                    variants={itemVariants}
                    className="flex flex-col justify-center items-center gap-8 w-full"
                >
                    <div className="w-full flex flex-col md:flex-row gap-8 items-center justify-center">
                        {/* Small Image Upload */}
                        <div className="w-full md:w-1/2 max-w-[300px] aspect-[5/7] relative group">
                            <label htmlFor='small_img' className="w-full h-full block cursor-pointer overflow-hidden rounded-xl shadow-xl transition-all duration-300 border-2 border-dashed border-gray-700 group-hover:border-purple-500">
                                {smallImg ? 
                                    <div className="relative h-full">
                                        <img className='w-full h-full object-cover' src={URL.createObjectURL(smallImg)} alt="Small poster" />
                                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                                            <span className="text-white text-sm font-medium px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full">ცვლილება</span>
                                        </div>
                                    </div>
                                : 
                                    <div className='flex flex-col justify-center items-center h-full p-3 bg-gradient-to-br from-gray-800 to-gray-900 text-gray-300 transition-all duration-300 group-hover:text-purple-400'>
                                        <span className="font-medium">პატარა ფოტო</span>
                                        <span className="text-xs opacity-60 mb-4">(500x700)</span>
                                        <div className='text-6xl mb-2 group-hover:scale-110 transition-transform duration-300'><RiFileUploadLine /></div>
                                        <span className="text-xs mt-2 opacity-60">დააჭირეთ ატვირთვისთვის</span>
                                    </div>
                                }
                            </label>
                            <input className='hidden' id='small_img' onChange={(e) => setSmallImg(e.target.files[0])} type="file" accept="image/png, image/jpeg" />
                        </div>

                        {/* Large Image Upload */}
                        <div className="w-full md:w-1/2 aspect-[2/1] relative group">
                            <label htmlFor='long_img' className="w-full h-full block cursor-pointer overflow-hidden rounded-xl shadow-xl transition-all duration-300 border-2 border-dashed border-gray-700 group-hover:border-indigo-500">
                                {longImg ? 
                                    <div className="relative h-full">
                                        <img className='w-full h-full object-cover' src={URL.createObjectURL(longImg)} alt="Banner" />
                                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                                            <span className="text-white text-sm font-medium px-3 py-1 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full">ცვლილება</span>
                                        </div>
                                    </div>
                                : 
                                    <div className='flex flex-col justify-center items-center h-full p-3 bg-gradient-to-br from-gray-800 to-gray-900 text-gray-300 transition-all duration-300 group-hover:text-indigo-400'>
                                        <span className="font-medium">დიდი ფოტო</span>
                                        <span className="text-xs opacity-60 mb-4">(1200x600)</span>
                                        <div className='text-6xl mb-2 group-hover:scale-110 transition-transform duration-300'><RiFileUploadLine /></div>
                                        <span className="text-xs mt-2 opacity-60">დააჭირეთ ატვირთვისთვის</span>
                                    </div>
                                }
                            </label>
                            <input className='hidden' id='long_img' onChange={(e) => setLongImg(e.target.files[0])} type="file" accept="image/png, image/jpeg" />
                        </div>
                    </div>
                </motion.div>
                
                <motion.div 
                    variants={itemVariants} 
                    className="w-full bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl mt-8"
                >
                    <h2 className="text-gray-300 mb-4 font-medium">ძირითადი ინფორმაცია</h2>
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-5">
                        <div className="flex flex-col gap-3 w-full lg:w-1/2">
                            <label className="text-gray-300 text-sm">სახელი (ქართულად)</label>
                            <input ref={nameRef} className="bg-gray-700 bg-opacity-50 text-white p-3 rounded-lg border border-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all" type="text" placeholder="შეიყვანეთ სახელი" />
                        </div>
                        <div className="flex flex-col gap-3 w-full lg:w-1/2">
                            <label className="text-gray-300 text-sm">სახელი (ინგლისურად)</label>
                            <input ref={nameEnRef} className="bg-gray-700 bg-opacity-50 text-white p-3 rounded-lg border border-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all" type="text" placeholder="Enter name" />
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="text-gray-300 text-sm mb-1 block">გამოშვების წელი</label>
                        <div className="rounded-lg overflow-hidden shadow-lg">
                            <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                <DemoContainer components={['DatePicker']} sx={{ 
                                    backgroundColor: 'transparent',
                                    '& .MuiInputBase-root': {
                                        borderRadius: '0.5rem',
                                        backgroundColor: 'rgba(55, 65, 81, 0.7)',
                                        border: '1px solid rgba(75, 85, 99, 0.8)',
                                        transition: 'all 0.3s',
                                        color: 'white',
                                        '&:hover': {
                                            borderColor: '#6366f1',
                                        },
                                        '&.Mui-focused': {
                                            borderColor: '#8b5cf6',
                                            boxShadow: '0 0 0 2px rgba(139, 92, 246, 0.3)',
                                        }
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'rgba(209, 213, 219, 0.8)',
                                        '&.Mui-focused': {
                                            color: '#a78bfa'
                                        }
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none'
                                    },
                                    '& .MuiButtonBase-root': {
                                        color: '#a78bfa'
                                    },
                                    '& .MuiTypography-root': {
                                        fontWeight: 500
                                    },
                                    '& .MuiPickersYear-yearButton': {
                                        '&.Mui-selected': {
                                            backgroundColor: '#8b5cf6',
                                            color: 'white'
                                        }
                                    },
                                    padding: 0,
                                }}>
                                    <DatePicker 
                                        label="გამოშვების წელი" 
                                        views={['year']} 
                                        onChange={(e) => setRelease(e.year())}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                sx: {
                                                    '& .MuiInputBase-input': {
                                                        py: 1.5,
                                                        color: 'white'
                                                    }
                                                }
                                            },
                                            paper: {
                                                sx: {
                                                    bgcolor: '#1f2937',
                                                    borderRadius: '0.5rem',
                                                    border: '1px solid #4b5563',
                                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                                                    '& .MuiPickersYear-yearButton': {
                                                        color: 'white',
                                                        '&.Mui-selected': {
                                                            backgroundColor: '#8b5cf6',
                                                            backgroundImage: 'linear-gradient(to right, #6366f1, #a855f7)',
                                                        },
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(139, 92, 246, 0.2)'
                                                        }
                                                    },
                                                    '& .MuiPickersCalendarHeader-root': {
                                                        color: 'white'
                                                    },
                                                    '& .MuiTypography-root': {
                                                        color: 'white'
                                                    },
                                                    '& .MuiButtonBase-root': {
                                                        color: 'white'
                                                    }
                                                }
                                            }
                                        }}
                                        sx={{
                                            width: '100%',
                                            '& .MuiInputBase-root': {
                                                borderRadius: '0.5rem'
                                            }
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    variants={itemVariants}
                    className="w-full bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl mt-8"
                >
                    <h2 className="text-gray-300 mb-4 font-medium">კატეგორიები</h2>
                    <div className="space-y-6">
                        <div>
                            <label className="text-gray-300 text-sm mb-1 block">ჟანრი</label>
                            <Select
                                onChange={setSelectedGenres}
                                isMulti
                                placeholder="აირჩიეთ ჟანრები..."
                                options={genres}
                                className="text-black"
                                classNamePrefix="select"
                                styles={customSelectStyles}
                                isDisabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="text-gray-300 text-sm mb-1 block">რეჟისორი</label>
                            <Select
                                onChange={setSelectedDirectors}
                                isMulti
                                placeholder="აირჩიეთ რეჟისორები..."
                                options={directors}
                                className="text-black"
                                classNamePrefix="select"
                                styles={customSelectStyles}
                                isDisabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="text-gray-300 text-sm mb-1 block">მსახიობები</label>
                            <Select
                                onChange={setSelectedActors}
                                isMulti
                                placeholder="აირჩიეთ მსახიობები..."
                                options={actors}
                                className="text-black"
                                classNamePrefix="select"
                                styles={customSelectStyles}
                                isDisabled={isLoading}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Video Upload Section - Different UI based on movie/series type */}
                <motion.div 
                    variants={itemVariants}
                    className="w-full bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl mt-8"
                >
                    <h2 className="text-gray-300 mb-4 font-medium">ვიდეო</h2>
                    
                    {/* Movie Video Uploader */}
                    {movieType === 0 && (
                        <div className="space-y-4">
                            <label 
                                htmlFor="movie-video" 
                                className={`w-full h-32 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed rounded-lg transition-all duration-300 ${
                                    movieVideo 
                                        ? 'border-green-500 bg-green-900/10' 
                                        : 'border-gray-700 hover:border-indigo-500 bg-gray-800/50'
                                }`}
                            >
                                {!movieVideo ? (
                                    <>
                                        <RiVideoUploadLine className="text-4xl text-gray-400 group-hover:text-indigo-400 mb-2" />
                                        <span className="text-gray-300">აირჩიეთ ფილმის ვიდეო</span>
                                        <span className="text-xs text-gray-500 mt-1">MP4, WebM, MKV ფორმატები</span>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <div className="bg-green-500 rounded-full p-2 mb-2">
                                            <RiVideoLine className="text-white text-xl" />
                                        </div>
                                        <span className="text-green-400 font-medium">{movieVideo.name}</span>
                                        <span className="text-green-500/70 text-xs">
                                            {formatFileSize(movieVideo.size)}
                                        </span>
                                        <span className="text-gray-400 text-xs mt-1">
                                            დააჭირეთ ვიდეოს შესაცვლელად
                                        </span>
                                    </div>
                                )}
                            </label>
                            <input 
                                ref={movieVideoRef}
                                id="movie-video" 
                                type="file" 
                                className="hidden" 
                                accept="video/*" 
                                onChange={handleMovieVideoChange} 
                            />
                            
                            {movieVideo && (
                                <button 
                                    type="button"
                                    className="bg-red-500/20 text-red-400 px-3 py-1 rounded-md text-sm flex items-center hover:bg-red-500/30"
                                    onClick={() => setMovieVideo(null)}
                                >
                                    <RiCloseLine className="mr-1" />
                                    წაშლა
                                </button>
                            )}
                        </div>
                    )}
                    
                    {/* TV Series Episodes Manager */}
                    {movieType === 1 && (
                        <div className="space-y-6">
                            {/* Episode Form */}
                            <div className="bg-gray-700/30 p-4 rounded-lg">
                                <h3 className="font-medium text-indigo-400 mb-3">
                                    {editingIndex !== null ? 'ეპიზოდის რედაქტირება' : 'ახალი ეპიზოდი'}
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="text-gray-300 text-sm block mb-1">სათაური</label>
                                        <input
                                            value={episodeTitle}
                                            onChange={(e) => setEpisodeTitle(e.target.value)}
                                            className="w-full bg-gray-700 bg-opacity-50 text-white p-2 rounded-lg border border-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                            placeholder="ეპიზოდის სათაური"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-gray-300 text-sm block mb-1">ეპიზოდის ნომერი</label>
                                        <input
                                            type="number"
                                            value={episodeNumber}
                                            onChange={(e) => setEpisodeNumber(e.target.value)}
                                            className="w-full bg-gray-700 bg-opacity-50 text-white p-2 rounded-lg border border-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                            placeholder="1"
                                            min="1"
                                        />
                                    </div>
                                </div>
                                
                                {/* Episode Video Upload */}
                                <div className="mb-4">
                                    <label className="text-gray-300 text-sm block mb-1">ვიდეო</label>
                                    <label 
                                        htmlFor="episode-video" 
                                        className={`w-full h-24 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed rounded-lg transition-all duration-300 ${
                                            episodeVideo 
                                                ? 'border-purple-500 bg-purple-900/10' 
                                                : 'border-gray-700 hover:border-indigo-500 bg-gray-800/50'
                                        }`}
                                    >
                                        {!episodeVideo ? (
                                            <>
                                                <RiVideoUploadLine className="text-3xl text-gray-400 group-hover:text-indigo-400 mb-1" />
                                                <span className="text-gray-300 text-sm block">აირჩიეთ ეპიზოდის ვიდეო</span>
                                            </>
                                        ) : (
                                            <div className="flex items-center justify-center">
                                                <div className="bg-purple-500 rounded-full p-1 mr-3">
                                                    <RiVideoLine className="text-white text-lg" />
                                                </div>
                                                <div>
                                                    <div className="text-purple-400 font-medium text-sm">
                                                        {episodeVideo.name}
                                                    </div>
                                                    <div className="text-purple-500/70 text-xs">
                                                        {formatFileSize(episodeVideo.size)}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </label>
                                    <input 
                                        ref={episodeVideoRef}
                                        id="episode-video" 
                                        type="file" 
                                        className="hidden" 
                                        accept="video/*" 
                                        onChange={handleEpisodeVideoChange} 
                                    />
                                </div>
                                
                                {episodeError && (
                                    <div className="text-red-400 text-sm mb-3">{episodeError}</div>
                                )}
                                
                                <div className="flex justify-end gap-2">
                                    {editingIndex !== null && (
                                        <button 
                                            type="button"
                                            onClick={() => {
                                                setEpisodeTitle('');
                                                setEpisodeNumber('');
                                                setEpisodeVideo(null);
                                                setEditingIndex(null);
                                                setEpisodeError('');
                                                if (episodeVideoRef.current) {
                                                    episodeVideoRef.current.value = '';
                                                }
                                            }}
                                            className="px-4 py-2 rounded-md text-sm bg-gray-600 text-white hover:bg-gray-500"
                                        >
                                            გაუქმება
                                        </button>
                                    )}
                                    <button 
                                        type="button"
                                        onClick={handleEpisodeAction}
                                        className={`px-4 py-2 rounded-md text-sm flex items-center ${
                                            editingIndex !== null 
                                                ? 'bg-amber-600 hover:bg-amber-500' 
                                                : 'bg-indigo-600 hover:bg-indigo-500'
                                        } text-white`}
                                    >
                                        {editingIndex !== null ? (
                                            <>
                                                <RiEdit2Line className="mr-1" />
                                                განახლება
                                            </>
                                        ) : (
                                            <>
                                                <RiAddLine className="mr-1" />
                                                დამატება
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                            
                            {/* Episodes List */}
                            <div className="space-y-1">
                                <div className="flex justify-between text-sm text-gray-400 mb-2 px-1">
                                    <span>სერიები ({episodes.length})</span>
                                </div>
                                
                                {episodes.length === 0 ? (
                                    <div className="bg-gray-700/30 rounded-lg py-8 text-center">
                                        <p className="text-gray-400">სერიები არ არის დამატებული</p>
                                        <p className="text-gray-500 text-sm mt-1">გთხოვთ დაამატოთ მინიმუმ ერთი ეპიზოდი</p>
                                    </div>
                                ) : (
                                    <div className="max-h-96 overflow-y-auto pr-1 custom-scrollbar">
                                        <AnimatePresence>
                                            {episodes.map((episode, index) => (
                                                <motion.div 
                                                    key={`${episode.episode_number}-${index}`}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className={`bg-gray-700/30 rounded-lg mb-2 p-3 flex items-center justify-between ${
                                                        editingIndex === index ? 'ring-2 ring-amber-500' : ''
                                                    }`}
                                                >
                                                    <div className="flex items-center">
                                                        <div className="bg-indigo-500 text-white text-sm font-medium rounded-md h-7 w-7 flex items-center justify-center mr-3">
                                                            {episode.episode_number}
                                                        </div>
                                                        <div>
                                                            <div className="text-white font-medium">
                                                                {episode.title}
                                                            </div>
                                                            <div className="text-gray-400 text-xs flex items-center">
                                                                <RiVideoLine className="mr-1" />
                                                                {episode.video.name.length > 20 
                                                                    ? `${episode.video.name.substring(0, 20)}...` 
                                                                    : episode.video.name
                                                                } ({formatFileSize(episode.video.size)})
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        <button 
                                                            type="button"
                                                            onClick={() => handleEditEpisode(index)}
                                                            className="p-1.5 text-amber-400 hover:bg-gray-600 rounded-md"
                                                            title="რედაქტირება"
                                                        >
                                                            <RiEdit2Line />
                                                        </button>
                                                        <button 
                                                            type="button"
                                                            onClick={() => handleDeleteEpisode(index)}
                                                            className="p-1.5 text-red-400 hover:bg-gray-600 rounded-md"
                                                            title="წაშლა"
                                                        >
                                                            <RiDeleteBin7Line />
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </motion.div>
                
                <motion.div 
                    variants={itemVariants}
                    className="w-full bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl mt-8"
                >
                    <h2 className="text-gray-300 mb-4 font-medium">აღწერა</h2>
                    <div>
                        <textarea 
                            ref={descriptionRef}  
                            className="w-full h-40 bg-gray-700 bg-opacity-50 text-white p-3 rounded-lg border border-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                            placeholder="შეიყვანეთ ფილმის აღწერა..."
                        ></textarea>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-10 w-full">
                    <button 
                        type="submit" 
                        disabled={isLoading || (movieType === 1 && episodes.length === 0)}
                        className={`w-full py-4 px-6 rounded-lg text-lg font-medium text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-indigo-700/50 ${
                            isLoading || (movieType === 1 && episodes.length === 0) 
                                ? 'opacity-70 cursor-not-allowed' 
                                : ''
                        }`}
                    >
                        {isLoading ? 'იტვირთება...' : 'ატვირთვა'}
                    </button>
                    
                    {movieType === 1 && episodes.length === 0 && (
                        <p className="text-center text-amber-400 text-sm mt-2">
                            გთხოვთ დაამატოთ მინიმუმ ერთი ეპიზოდი
                        </p>
                    )}
                </motion.div>
            </motion.form>
        </div>
    )
}

export default AddMovie
