import sampleVideo from './../../public/movies/m1.mp4';
import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';

function VideoPlayer() {
    const playerRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [prevVolume, setPrevVolume] = useState(0.8);
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(0);
    const [quality, setQuality] = useState('sd');
    const [language, setLanguage] = useState('ge');
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const [isPiP, setIsPiP] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [hideCursor, setHideCursor] = useState(false);
    const [lastClickedVideo, setLastClickedVideo] = useState(false); // Track if video was last clicked

    const movie = {
        'ge': { quality: { 'sd': sampleVideo, 'hd': 'ge' } },
        'en': { quality: { 'sd': sampleVideo, 'hd': 'en' } },
        'ru': { quality: { 'sd': sampleVideo, 'hd': 'ru' } },
    };

    const hideControlsTimeout = useRef(null);
    const mouseMoveTimeout = useRef(null);

    const resetControlsTimeout = () => {
        clearTimeout(hideControlsTimeout.current);
        setShowControls(true);
        setHideCursor(false);

        if (playing) {
            hideControlsTimeout.current = setTimeout(() => {
                setShowControls(false);
                setHideCursor(true);
            }, 2000);
        }
    };

    const handlePlayPause = () => {
        setPlaying(prev => !prev);
        resetControlsTimeout();
        // Show controls for 2 seconds when play/pause is clicked
        hideControlsTimeout.current = setTimeout(() => {
            if (!playing) {
                setShowControls(false);
            }
        }, 2000);
    };

    const handleVolumeChange = (event) => {
        setVolume(parseFloat(event.target.value));
    };

    const handleSeekChange = (event) => {
        setPlayed(parseFloat(event.target.value));
        playerRef.current.seekTo(parseFloat(event.target.value) * duration);
    };

    const handleQualityChange = (event) => {
        setQuality(event.target.value);
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleRewind = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5);
    };

    const handleFastForward = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${hours > 0 ? hours + ':' : ''}${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleVolumeToggle = () => {
        if (volume === 0) {
            setVolume(prevVolume);
        } else {
            setPrevVolume(volume);
            setVolume(0);
        }
    };

    const togglePiP = async () => {
        if (isPiP) {
            await document.exitPictureInPicture();
            setIsPiP(false);
        } else {
            try {
                await playerRef.current.getInternalPlayer().requestPictureInPicture();
                setIsPiP(true);
            } catch (error) {
                console.error('Error entering Picture-in-Picture mode:', error);
            }
        }
    };

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            playerRef.current.wrapper.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
        setIsFullscreen(!isFullscreen);
    };

    const handlePiPChange = () => {
        setIsPiP(false);
    };

    const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
    };

    useEffect(() => {
        document.addEventListener('leavepictureinpicture', handlePiPChange);
        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('leavepictureinpicture', handlePiPChange);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    const handleMouseEnter = () => {
        resetControlsTimeout();
    };

    const handleMouseLeave = () => {
        if (playing) {
            hideControlsTimeout.current = setTimeout(() => {
                setShowControls(false);
                setHideCursor(true);
            }, 2000);
        }
    };

    const handleMouseMove = () => {
        resetControlsTimeout();

        if (playing) {
            clearTimeout(mouseMoveTimeout.current);
            mouseMoveTimeout.current = setTimeout(() => {
                if (playing) {
                    setShowControls(false);
                    setHideCursor(true);
                }
            }, 2000);
        }
    };

    const handleDoubleClick = () => {
        toggleFullscreen();
    };

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowLeft') {
            handleRewind();
        } else if (event.key === 'ArrowRight') {
            handleFastForward();
        } else if (lastClickedVideo && (event.key === ' ' || event.key === 'Enter')) {
            event.preventDefault(); // Prevent scrolling
            handlePlayPause(); // Play or pause the video
        }
    };

    // Handle tracking of last interaction with video
    useEffect(() => {
        const handleMouseMove = () => {
            resetControlsTimeout();
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [playing, lastClickedVideo]);

    return (
        <div
            className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : ''} ${hideCursor ? 'cursor-none' : ''}`}
            onDoubleClick={handleDoubleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            <ReactPlayer
                ref={playerRef}
                url={movie[language].quality[quality]}
                playing={playing}
                volume={volume}
                onDuration={setDuration}
                onProgress={({ played }) => setPlayed(played)}
                onPlay={() => {
                    setPlaying(true);
                    resetControlsTimeout();
                }}
                onPause={() => {
                    setPlaying(false);
                    resetControlsTimeout();
                }}
                width="100%"
                height="100%"
                onClick={handlePlayPause}
                tabIndex={0} // Make it focusable
                onFocus={() => setLastClickedVideo(true)} // Track focus
                onBlur={() => setLastClickedVideo(false)} // Track loss of focus
            />
            <div className='absolute w-full bottom-3 left-0'>
                <div className='w-[95%] mx-auto'>
                    {showControls && (
                        <div className="mt-2">
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step={0.01}
                                value={played}
                                onChange={handleSeekChange}
                                className="w-full mx-2"
                            />
                            <div className="text-center text-white mt-2">
                                {formatTime(Math.floor(duration * played))} / {formatTime(duration)}
                            </div>
                        </div>
                    )}

                    {showControls && (
                        <div className="flex items-center justify-between mt-4">
                            <div className='flex items-center gap-3'>
                                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={handlePlayPause}>
                                    {playing ? '⏸️' : '▶️'}
                                </button>
                                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={handleRewind}>
                                    ⏪ 5s
                                </button>
                                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={handleFastForward}>
                                    5s ⏩
                                </button>

                                <div className="flex items-center">
                                    <div 
                                        className="flex items-center" 
                                        onMouseEnter={() => setShowVolumeSlider(true)} 
                                        onMouseLeave={() => setShowVolumeSlider(false)}
                                    >
                                        <button className="text-white mr-2" onClick={handleVolumeToggle}>
                                            {volume > 0 ? '🔊' : '🔇'}
                                        </button>
                                        {showVolumeSlider && (
                                            <input
                                                type="range"
                                                min={0}
                                                max={1}
                                                step={0.01}
                                                value={volume}
                                                onChange={handleVolumeChange}
                                                className="w-24"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className='flex items-center gap-3'> 
                                <select
                                    value={quality}
                                    onChange={handleQualityChange}
                                    className="bg-gray-700 text-white rounded py-2 px-4"
                                >
                                    <option value="sd">SD</option>
                                    <option value="hd">HD</option>
                                </select>

                                <select
                                    value={language}
                                    onChange={handleLanguageChange}
                                    className="bg-gray-700 text-white rounded py-2 px-4"
                                >
                                    <option value="ge">ge</option>
                                    <option value="en">en</option>
                                    <option value="ru">ru</option>
                                </select>

                                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={togglePiP}>
                                    {isPiP ? '📺' : '🖼️'}
                                </button>
                                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={toggleFullscreen}>
                                    {isFullscreen ? '🔲' : '🔲'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VideoPlayer;
