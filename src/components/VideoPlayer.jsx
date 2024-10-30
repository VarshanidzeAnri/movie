import movie from './../../public/movies/m1.mp4';
import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaBackward, FaForward } from "react-icons/fa";

function VideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isVolumeHovered, setIsVolumeHovered] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState("hd");
  const [selectedLanguage, setSelectedLanguage] = useState("geo");
  const [videoFocused, setVideoFocused] = useState(false); // Track if video was focused

  const videoSources = {
    geo: { sd: movie, hd: movie },
    en: { sd: movie, hd: movie },
    ru: { sd: movie, hd: movie },
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    videoRef.current.muted = !isMuted;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
  };

  const handleFullscreen = () => {
    if (!isFullscreen) {
      videoRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const updateTime = () => {
      if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
      }
    };

    const setVideoDuration = () => {
      if (videoRef.current) {
        setDuration(videoRef.current.duration);
      }
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("timeupdate", updateTime);
      videoRef.current.addEventListener("loadedmetadata", setVideoDuration);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("timeupdate", updateTime);
        videoRef.current.removeEventListener("loadedmetadata", setVideoDuration);
      }
    };
  }, [videoRef]);

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return hours > 0
      ? `${hours}:${minutes.toString().padStart(2, 0)}:${seconds}`
      : `${minutes}:${seconds}`;
  };

  const skipTime = (seconds) => {
    videoRef.current.currentTime = Math.min(Math.max(videoRef.current.currentTime + seconds, 0), duration);
    setCurrentTime(videoRef.current.currentTime);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenElement = document.fullscreenElement;
      setIsFullscreen(!!fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const handleKeydown = (e) => {
      if (videoFocused) { // Only check if video was focused
        if (e.key === "F" || e.key === "f") {
          handleFullscreen();
        } else if (e.key === "Enter" || e.key === " ") {
          e.preventDefault(); // Prevent default action (like scrolling down)
          togglePlayPause();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          skipTime(5);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          skipTime(-5);
        } else if (e.key >= 0 && e.key <= 9) {
          const percentage = parseInt(e.key);
          const newTime = (percentage / 10) * duration;
          videoRef.current.currentTime = newTime;
          setCurrentTime(newTime);
        }
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [isPlaying, isFullscreen, duration, videoFocused]);

  const handleDoubleClick = () => {
    handleFullscreen();
  };

  const handleQualityChange = (e) => {
    setSelectedQuality(e.target.value);
    videoRef.current.src = videoSources[selectedLanguage][e.target.value];
    videoRef.current.load();
    if (isPlaying) {
      videoRef.current.play();
    }
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    videoRef.current.src = videoSources[e.target.value][selectedQuality];
    videoRef.current.load();
    if (isPlaying) {
      videoRef.current.play();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="relative w-full max-w-2xl">
        <video
          ref={videoRef}
          className="w-full rounded-lg"
          src={videoSources[selectedLanguage][selectedQuality]}
          onClick={togglePlayPause}
          onDoubleClick={handleDoubleClick}
          onFocus={() => setVideoFocused(true)} // Track when video is focused
          onBlur={() => setVideoFocused(false)} // Track when video loses focus
          tabIndex="0" // Make the video element focusable
        />

        {/* Control Bar */}
        <div className="absolute bottom-0 w-full bg-black bg-opacity-90 p-4 flex flex-col">
          {/* Timing Slider */}
          <div className="flex items-center w-full mb-2">
            <span className="text-white text-sm">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="flex-grow mx-2"
            />
            <span className="text-white text-sm">{formatTime(duration)}</span>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            {/* Backward 5 Seconds Button */}
            <button onClick={() => skipTime(-5)} className="text-white mx-2">
              <FaBackward />
            </button>

            {/* Play/Pause Button */}
            <button onClick={togglePlayPause} className="text-white mx-2">
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>

            {/* Forward 5 Seconds Button */}
            <button onClick={() => skipTime(5)} className="text-white mx-2">
              <FaForward />
            </button>

            {/* Volume Control */}
            <div
              className="flex items-center"
              onMouseEnter={() => setIsVolumeHovered(true)}
              onMouseLeave={() => setIsVolumeHovered(false)}
            >
              <button onClick={toggleMute} className="text-white">
                {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
              {isVolumeHovered && (
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 mx-2"
                />
              )}
            </div>

            {/* Quality Selection */}
            <select
              value={selectedQuality}
              onChange={handleQualityChange}
              className="bg-gray-700 text-white rounded mx-2"
            >
              <option value="sd">SD</option>
              <option value="hd">HD</option>
            </select>

            {/* Language Selection */}
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="bg-gray-700 text-white rounded mx-2"
            >
              <option value="geo">Georgian</option>
              <option value="en">English</option>
              <option value="ru">Russian</option>
            </select>

            {/* Fullscreen Button */}
            <button onClick={handleFullscreen} className="text-white mx-2">
              <FaExpand />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
