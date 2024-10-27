import sampleVideo from './../../public/movies/m1.mp4';
import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';



function VideoPlayer() {
    const playerRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [prevVolume, setPrevVolume] = useState(0.8); // Store the previous volume
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(0);
    const [quality, setQuality] = useState('720p');
    const [showVolumeSlider, setShowVolumeSlider] = useState(false); // State for volume slider visibility
    const [isPiP, setIsPiP] = useState(false); // State for Picture-in-Picture

    const videoUrls = {
        '720p': sampleVideo,
        '1080p': 'https://www.example.com/video_1080p.mp4',
        '4K': 'https://www.example.com/video_4k.mp4',
    };
  
   
    const handlePlayPause = () => {
        setPlaying(play => !play);
    };

    const handleVolumeChange = (event) => {
        setVolume(parseFloat(event.target.value)); // Update volume based on slider value
    };

    const handleSeekChange = (event) => {
        setPlayed(parseFloat(event.target.value));
        playerRef.current.seekTo(parseFloat(event.target.value) * duration);
    };

    const handleQualityChange = (event) => {
        setQuality(event.target.value);
    };

    const handleRewind = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5); // Rewind 5 seconds
    };

    const handleFastForward = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5); // Fast forward 5 seconds
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);

        return `${hours > 0 ? hours + ':' : ''}${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Toggle volume on icon click
    const handleVolumeToggle = () => {
        if (volume === 0) {
            setVolume(prevVolume); // Restore previous volume
        } else {
            setPrevVolume(volume); // Store current volume before setting to 0
            setVolume(0); // Mute the volume
        }
    };

    // Handle Picture-in-Picture
    const togglePiP = async () => {
        if (isPiP) {
            // Exit PiP mode
            await document.exitPictureInPicture();
            setIsPiP(false);
        } else {
            // Request PiP
            try {
                await playerRef.current.getInternalPlayer().requestPictureInPicture();
                setIsPiP(true);
            } catch (error) {
                console.error('Error entering Picture-in-Picture mode:', error);
            }
        }
    };

    // Handle play/pause event from PiP mode
    const handlePlay = () => {
        setPlaying(true);
    };

    const handlePause = () => {
        setPlaying(false);
    };

    // Update PiP state when exiting PiP mode
    const handlePiPChange = () => {
        setIsPiP(false); // Set PiP state to false when exiting
    };

    useEffect(() => {
        // Listen for the PiP event
        document.addEventListener('leavepictureinpicture', handlePiPChange);

        return () => {
            document.removeEventListener('leavepictureinpicture', handlePiPChange);
        };
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-4 bg-gray-800 rounded-lg shadow-lg">
            <ReactPlayer
                ref={playerRef}
                url={videoUrls[quality]}
                playing={playing}
                volume={volume}
                onDuration={setDuration}
                onProgress={({ played }) => setPlayed(played)}
                onPlay={handlePlay} // Handle play event
                onPause={handlePause} // Handle pause event
                width="100%"
                height="100%"
                onClick={handlePlayPause} // Add click to play/pause functionality
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
                    <span>{formatTime(Math.floor(duration * played))} / {formatTime(duration)} </span>
                </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between mt-4">
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    onClick={handleRewind}
                >
                    ⏪ 5s
                </button>
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    onClick={handlePlayPause}
                >
                    {playing ? (
                        <span className="text-xl">⏸️</span> // Pause icon
                    ) : (
                        <span className="text-xl">▶️</span> // Play icon
                    )}
                </button>
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    onClick={handleFastForward}
                >
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
                {/* PiP Button with Icon */}
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    onClick={togglePiP}
                >
                    {isPiP ? '📺' : '🖼️'} {/* Picture-in-Picture icon changes based on PiP state */}
                </button>
            </div>

            {/* Volume Control */}
            <div className="mt-4 flex items-center">
                {/* Volume Icon and Slider in Same Container */}
                <div 
                    className="flex items-center" 
                    onMouseEnter={() => setShowVolumeSlider(true)} 
                    onMouseLeave={() => setShowVolumeSlider(false)}
                >
                    <button className="text-white mr-2" onClick={handleVolumeToggle}>
                        {volume > 0 ? '🔊' : '🔇'} {/* Volume icon changes based on volume state */}
                    </button>
                    
                    {/* Volume Slider */}
                    {showVolumeSlider && (
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={volume}
                            onChange={handleVolumeChange} // Update volume on change
                            className="w-32 mx-2" // Adjust width as necessary
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default VideoPlayer
