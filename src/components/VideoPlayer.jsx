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
    const [quality, setQuality] = useState('720p');
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const [isPiP, setIsPiP] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const videoUrls = {
        '720p': sampleVideo,
        '1080p': 'https://www.example.com/video_1080p.mp4',
        '4K': 'https://www.example.com/video_4k.mp4',
    };
  
   
    const handlePlayPause = () => {
        setPlaying(play => !play);
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

    const handleDoubleClick = () => {
        toggleFullscreen();
    };

    return (
        <div
        className={`max-w-2xl mx-auto p-4 bg-gray-800 rounded-lg shadow-lg ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
        onDoubleClick={handleDoubleClick}
    >
        <ReactPlayer
            ref={playerRef}
            url={videoUrls[quality]}
            playing={playing}
            volume={volume}
            onDuration={setDuration}
            onProgress={({ played }) => setPlayed(played)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            width="100%"
            height="100%"
            onClick={handlePlayPause}
        />

        {/* Video Timing Slider */}
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
                <span>{formatTime(Math.floor(duration * played))} / {formatTime(duration)}</span>
            </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between mt-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={handleRewind}>
                ⏪ 5s
            </button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={handlePlayPause}>
                {playing ? '⏸️' : '▶️'}
            </button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={handleFastForward}>
                5s ⏩
            </button>
            <select
                value={quality}
                onChange={handleQualityChange}
                className="bg-gray-700 text-white rounded py-2 px-4"
            >
                <option value="720p">720p</option>
                <option value="1080p">1080p</option>
                <option value="4K">4K</option>
            </select>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={togglePiP}>
                {isPiP ? '📺' : '🖼️'}
            </button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={toggleFullscreen}>
                {isFullscreen ? '🔲' : '🔲'}
            </button>
        </div>

        {/* Volume Control */}
        <div className="mt-4 flex items-center">
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
                        className="w-32 mx-2"
                    />
                )}
            </div>
        </div>
    </div>
    )
}

export default VideoPlayer
