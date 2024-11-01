import ReactPlayer from 'react-player';
import movie from './../../public/movies/m1.mp4';
import { Slider } from '@mui/material';
import { FastForward, FastRewind, Fullscreen, Pause, PlayArrow, VolumeOff, VolumeUp } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import screenfull from 'screenfull';

function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [volume, setVolume] = useState(1);
  const [volumeIsHidden, setVolumeIsHidden] = useState(true);
  const [quality, setQuality] = useState('sd');
  const [language, setLanguage] = useState('geo');
  const [isQualityPopOpen, setIsQualityPopOpen] = useState(false);
  const [isLanguagePopOpen, setIsLanguagePopOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true); // State to control visibility of controls

  const fullscreenRef = useRef();
  const playerRef = useRef();
  const hideControlsTimeout = useRef(null); // Ref to keep track of the timeout
  const mouseMoveTimeout = useRef(null); // Ref to track mouse movement

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'f') toggleFullscreen();
      // Seek functionality for keys 0 to 9
      if (e.key >= '0' && e.key <= '9' && !e.ctrlKey && !e.shiftKey && !e.altKey) {
        const percentage = (parseInt(e.key) / 10); // Convert key to a percentage (0-1)
        const seekTime = duration * percentage; // Calculate seek time based on total duration
        playerRef.current.seekTo(seekTime);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [duration]); // Add duration to the dependency array

  const toggleFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle(fullscreenRef.current);
    }
  };

  const handlePlaying = () => {
    setIsPlaying((prev) => !prev);
    if (!isPlaying) {
      setControlsVisible(true); // Show controls when playing starts
    }
  };

  const handleMute = () => setIsMute((prev) => !prev);
  const handleRewind = () => playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  const handleFastForward = () => playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);

  const handleVolumeChange = (e, newValue) => {
    setVolume(newValue / 100);
    setIsMute(newValue === 0);
  };

  const handleQualityPop = (newValue) => {
    setQuality(newValue);
    setIsQualityPopOpen(false);
  };

  const handleLanguagePop = (newValue) => {
    setLanguage(newValue);
    setIsLanguagePopOpen(false);
  };

  const movieSource = {
    geo: { sd: movie, hd: 'm1_hd.mp4' },
    eng: { sd: movie, hd: 'm1_hd.mp4' },
    rus: { sd: movie, hd: 'm1_hd.mp4' },
  };

  const onProgress = ({ playedSeconds }) => {
    if (!seeking) setCurrentTime(playedSeconds);
  };

  const onSeekChange = (e, newValue) => {
    setCurrentTime(newValue);
    playerRef.current.seekTo(newValue);
  };

  const onSeekMouseDown = () => {
    setSeeking(true);
    setIsPlaying(false); // Stop playing when seeking
  };

  const onSeekMouseUp = (e, newValue) => {
    setSeeking(false);
    playerRef.current.seekTo(newValue);
    if (newValue > 0) {
      setIsPlaying(true);
    }
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hrs > 0) return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMouseEnter = () => {
    setControlsVisible(true);
    clearTimeout(hideControlsTimeout.current); // Clear any existing hide timeout
    clearTimeout(mouseMoveTimeout.current); // Clear any existing mouse movement timeout
  };

  const handleMouseLeave = () => {
    // Start a timeout to hide the controls after 2 seconds only if video is playing
    if (isPlaying) {
      hideControlsTimeout.current = setTimeout(() => {
        setControlsVisible(false);
      }, 2000); // Adjust the time as needed
    }
  };

  const handleMouseMove = () => {
    setControlsVisible(true);
    clearTimeout(hideControlsTimeout.current); // Clear hide timeout when mouse moves
    // Restart the timeout for hiding controls after 2 seconds of inactivity only if video is playing
    if (isPlaying) {
      clearTimeout(mouseMoveTimeout.current); // Clear previous mouse move timeout
      mouseMoveTimeout.current = setTimeout(() => {
        hideControlsTimeout.current = setTimeout(() => {
          setControlsVisible(false);
        }, 2000);
      }, 100); // Reset the mouse move timer
    }
  };

  // Function to handle when video ends
  const handleEnded = () => {
    setIsPlaying(false); // Pause the video
    setControlsVisible(true)
  };

  return (
    <div
      ref={fullscreenRef}
      className={`w-full h-full relative ${!controlsVisible ? 'cursor-none' : ''}`} // Hide cursor if controls are hidden
    >
      <ReactPlayer
        ref={playerRef}
        width="100%"
        height="100%"
        url={movieSource[language][quality]}
        playing={isPlaying}
        muted={isMute}
        volume={volume}
        onProgress={onProgress}
        onDuration={setDuration}
        onEnded={handleEnded} // Handle when video ends
      />

      {/* overlay */}
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-black opacity-30" 
        onMouseEnter={handleMouseEnter} // Show controls when mouse enters the video area
        onMouseLeave={handleMouseLeave} // Hide controls when mouse leaves
        onMouseMove={handleMouseMove}>
        
      </div>

      {/* Controls */}
      {controlsVisible && (
        <>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-start gap-10">
            <div onClick={handlePlaying}>
              {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
            </div>
          </div>

          <div className="absolute right-0 left-0 bottom-0 w-[95%] mx-auto">
            <Slider
              size="medium"
              value={currentTime}
              min={0}
              max={duration}
              onChange={onSeekChange}
              onMouseDown={onSeekMouseDown}
              onChangeCommitted={onSeekMouseUp}
              aria-label="Seek"
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => formatTime(value)} // Display time in HH:MM:SS format
            />
            <div className="p-2 flex justify-between">
              <div className="flex justify-start gap-5 items-center">
                <div onClick={handlePlaying} className="text-white">
                  {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
                </div>
                <div onClick={handleRewind} className="text-white">
                  <FastRewind fontSize="large" />
                </div>
                <div onClick={handleFastForward} className="text-white">
                  <FastForward fontSize="large" />
                </div>
                <div onMouseEnter={() => setVolumeIsHidden(false)} onMouseLeave={() => setVolumeIsHidden(true)} className="relative flex gap-5 items-center justify-start">
                  <div onClick={handleMute}>{isMute ? <VolumeOff fontSize="large" /> : <VolumeUp fontSize="large" />}</div>
                  <div className={`w-20 flex items-center ${volumeIsHidden && 'hidden'}`}>
                    <Slider value={Math.round(volume * 100)} aria-label="Default" valueLabelDisplay="auto" onChange={handleVolumeChange} />
                  </div>
                </div>
                <div className="text-white">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
              <div className="flex justify-end gap-5 items-center">
                <div className="relative flex flex-col items-center p-3 bg-black">
                  <button onClick={() => setIsQualityPopOpen((prev) => !prev)} className="text-white">{quality.toUpperCase()}</button>
                  <div className={`${!isQualityPopOpen && 'hidden'} absolute p-3 bottom-10 left-0 flex flex-col items-center gap-3 bg-black`}>
                    {['sd', 'hd'].map((q, i) => (
                      <button key={i} onClick={() => handleQualityPop(q)} className="text-white">{q.toUpperCase()}</button>
                    ))}
                  </div>
                </div>
                <div className="relative flex flex-col items-center p-3 bg-black">
                  <button onClick={() => setIsLanguagePopOpen((prev) => !prev)} className="text-white">{language.toUpperCase()}</button>
                  <div className={`${!isLanguagePopOpen && 'hidden'} absolute p-3 bottom-10 left-0 flex flex-col items-center gap-3 bg-black`}>
                    {['geo', 'eng', 'rus'].map((lang, i) => (
                      <button key={i} onClick={() => handleLanguagePop(lang)} className="text-white">{lang.toUpperCase()}</button>
                    ))}
                  </div>
                </div>
                <div onClick={toggleFullscreen} className="text-white"><Fullscreen fontSize="large" /></div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default VideoPlayer;
