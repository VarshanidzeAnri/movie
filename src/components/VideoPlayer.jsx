import ReactPlayer from 'react-player';
// import movie from './../../public/movies/m1.mp4';
import { Slider } from '@mui/material';
import { FastForward, FastRewind, Fullscreen, Pause, PlayArrow, VolumeOff, VolumeUp } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import screenfull from 'screenfull';
import './videoPlayer.css'

function VideoPlayer({video}) {
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
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false); // Track if the player is focused
  const [lastVolume, setLastVolume] = useState(1); // Track the last volume level


  const fullscreenRef = useRef();
  const playerRef = useRef();
  const hideControlsTimeout = useRef(null);
  const mouseMoveTimeout = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'f' && isFocused) toggleFullscreen();
      if (isFocused && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault(); // Prevent default behavior for space/enter
        handlePlaying(); // Play/Pause the video
      }
      if (e.key >= '0' && e.key <= '9' && !e.ctrlKey && !e.shiftKey && !e.altKey && isFocused) {
        const percentage = (parseInt(e.key) / 10);
        const seekTime = duration * percentage;
        playerRef.current.seekTo(seekTime);
        setControlsVisible(true);
      }

      // Fast rewind on left arrow key
      if (e.key === 'ArrowLeft' && isFocused) {
        e.preventDefault(); // Prevent default action
        handleRewind(); // Call the fast rewind function
      }
      // Fast forward on right arrow key
      if (e.key === 'ArrowRight' && isFocused) {
        e.preventDefault(); // Prevent default action
        handleFastForward(); // Call the fast forward function
      }
// Volume up on arrow up key
if (e.key === 'ArrowUp' && isFocused) {
  e.preventDefault(); // Prevent default action
  setVolume((prev) => {
    const newVolume = Math.min(prev + 0.1, 1); // Increase volume by 10%
    if (newVolume > 0) setIsMute(false); // Unmute if volume is increased from 0
    return newVolume;
  });
}

// Volume down on arrow down key
if (e.key === 'ArrowDown' && isFocused) {
  e.preventDefault(); // Prevent default action
  setVolume((prev) => {
    const newVolume = Math.max(prev - 0.1, 0); // Decrease volume by 10%
    if (newVolume === 0) setIsMute(true); // Mute if volume goes down to 0
    return newVolume;
  });
}
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [duration, isFocused]);

  const toggleFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle(fullscreenRef.current);
      
    }
  };

  const handleMute = () => {
    setIsMute((prev) => {
      if (prev) {
        // If currently muted, restore the last volume level
        setVolume(lastVolume);
      } else {
        // If unmuted, store the current volume as lastVolume and mute
        setLastVolume(volume); // Store current volume before muting
        setVolume(0); // Mute
      }
      return !prev; // Toggle mute state
    });
  };

  const handlePlaying = () => {
    setIsPlaying((prev) => {
      const newState = !prev; // Toggle play state
      if (!newState) {
        setControlsVisible(true); // Show controls if video is paused
      }
      return newState;
    });
  };

  // const handleMute = () => setIsMute((prev) => !prev);
  const handleRewind = () => playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5);
  const handleFastForward = () => playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);

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
    setIsPlaying(false);
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
    clearTimeout(hideControlsTimeout.current);
    clearTimeout(mouseMoveTimeout.current);
  };

  const handleMouseLeave = () => {
    if (isPlaying) {
      hideControlsTimeout.current = setTimeout(() => {
        setControlsVisible(false);
      }, 2000);
    }
  };

  const handleMouseMove = () => {
    setControlsVisible(true);
    clearTimeout(hideControlsTimeout.current);
    if (isPlaying) {
      clearTimeout(mouseMoveTimeout.current);
      mouseMoveTimeout.current = setTimeout(() => {
        hideControlsTimeout.current = setTimeout(() => {
          setControlsVisible(false);
        }, 2000);
      }, 100);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setControlsVisible(true);
  };

  // Double click handler for fullscreen
  const handleDoubleClick = () => {
    toggleFullscreen();
  };

  return (
    <div
      ref={fullscreenRef}
      className={`w-full h-full relative outline-none ${!controlsVisible ? 'cursor-none' : ''}`}
      tabIndex={0} // Make the div focusable
      onFocus={() => setIsFocused(true)} // Set focus state when focused
      onBlur={() => setIsFocused(false)} // Clear focus state when blurred
    >
      {/* Clickable area for video to play/pause */}
      <div className="absolute inset-0 w-full">
        <ReactPlayer
          ref={playerRef}
          width="100%"
          height="100%"
          url={video}
          playing={isPlaying}
          muted={isMute}
          volume={volume}
          onProgress={onProgress}
          onDuration={setDuration}
          onEnded={handleEnded}
          controls={false}
          
          
        />
      </div>

      {/* Overlay that captures click events */}
        <div 
        className={`absolute top-0 right-0 left-0 bottom-0 bg-black opacity-30 ${!controlsVisible && 'opacity-0'}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={handlePlaying} // Click on overlay also plays/pauses video
        onDoubleClick={handleDoubleClick} // Double click on overlay for fullscreen
      >
      </div>

      {controlsVisible && (
        <div className='react-player-video-controllers'>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-start gap-10">
            <div onClick={handlePlaying}>
              {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
            </div>
          </div>

          <div className="absolute right-0 left-0 bottom-0 w-[95%] mx-auto">
            <Slider
              color='error'
              size="medium"
              value={currentTime}
              min={0}
              max={duration}
              onChange={onSeekChange}
              onMouseDown={onSeekMouseDown}
              onChangeCommitted={onSeekMouseUp}
              aria-label="Seek"
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => formatTime(value)}
            />
            <div className="flex justify-between mb-2">
              <div className="flex justify-start gap-2 items-center">
                <div onClick={handlePlaying} className="text-white cursor-pointer">
                  {isPlaying ? <Pause  fontSize='medium' /> : <PlayArrow fontSize='medium'  />}
                </div>
                <div onClick={handleRewind} className="text-white cursor-pointer">
                  <FastRewind fontSize='medium' />
                </div>
                <div onClick={handleFastForward} className="text-white cursor-pointer">
                  <FastForward fontSize='medium'  />
                </div>
                <div onMouseEnter={() => setVolumeIsHidden(false)} onMouseLeave={() => setVolumeIsHidden(true)} className="relative flex gap-2 items-center justify-start">
                  <div onClick={handleMute} className='cursor-pointer'>{isMute ? <VolumeOff fontSize="medium" /> : <VolumeUp fontSize="medium" />}</div>
                  <div className={`w-20 flex items-center ${volumeIsHidden && 'hidden'}`}>
                    <Slider value={Math.round(volume * 100)} aria-label="Default" valueLabelDisplay="auto" onChange={handleVolumeChange} size='small' color='error' />
                  </div>
                </div>
                <div className="text-white text-sm ml-2">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
              <div className="flex justify-end gap-5 items-center ">
                <div className="relative flex flex-col items-center p-2 bg-[#ff0009] text-sm rounded">
                  <button onClick={() => setIsQualityPopOpen((prev) => !prev)} className="text-white">{quality.toUpperCase()}</button>
                  <div className={`${!isQualityPopOpen && 'hidden'} absolute p-2 bottom-10 left-0 flex flex-col items-center gap-3 bg-black rounded-t`}>
                    {['sd', 'hd'].map((q, i) => (
                      <button key={i} onClick={() => handleQualityPop(q)} className="text-white">{q.toUpperCase()}</button>
                    ))}
                  </div>
                </div>
                <div className="relative flex flex-col items-center p-2 bg-[#ff0009] text-sm rounded">
                  <button onClick={() => setIsLanguagePopOpen((prev) => !prev)} className="text-white">{language.toUpperCase()}</button>
                  <div className={`${!isLanguagePopOpen && 'hidden'} absolute p-2 bottom-10 left-0 flex flex-col items-center gap-3 bg-black rounded-t`}>
                    {['geo', 'eng', 'rus'].map((lang, i) => (
                      <button key={i} onClick={() => handleLanguagePop(lang)} className="text-white">{lang.toUpperCase()}</button>
                    ))}
                  </div>
                </div>
                <div onClick={toggleFullscreen} className="text-white"><Fullscreen fontSize="medium" /></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;
