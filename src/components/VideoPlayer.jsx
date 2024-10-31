import ReactPlayer from 'react-player';
import movie from './../../public/movies/m1.mp4';
import { Button, Popover, Slider, Typography } from '@mui/material';
import { FastForward, FastRewind, Fullscreen, Pause, PlayArrow, VolumeOff, VolumeUp } from '@mui/icons-material';
import { useRef, useState } from 'react';
import screenfull from 'screenfull';

function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMute, setIsMute] = useState(false)
  const [volume, setVolume] = useState(1);
  const [volumeIsHidden, setVolumeIsHidden] = useState(true)
  const [quality, setQuality] = useState('hd');
  const [language, setLanguage] = useState('geo');
  const [isQualityPopOpen, setIsQualityPopOpen] = useState(false);
  const [isLanguagePopOpen, setIsLanguagePopOpen] = useState(false);


  // fullscreen
  const fullscreenRef = useRef();

  const toggleFullscreen = () => {
    screenfull.toggle(fullscreenRef.current)
  }
  // end fullscreen


  const handlePlaying = () => {
    setIsPlaying(!isPlaying);
  }

  const handleMute = () => {
    setIsMute(!isMute);
  }

  const playerRef = useRef()

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10)
  }

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10)
  }

  const handleVolumeChange = (e, newValue) => {
    setVolume(parseFloat(newValue / 100))
    setIsMute(newValue === 0 ? true : false)
  }

  const handleVolumeSeekUp = (e, newValue) => {
    setVolume(parseFloat(newValue / 100))
    setIsMute(newValue === 0 ? true : false)
  }


  // change that
  const handleQualityPop = (newValue) => {
    setQuality(newValue);
    setIsQualityPopOpen(false)
  }

  const handleQualityPopOpen= () => {
    setIsQualityPopOpen(open => !open)
  }

  const handleLanguagePop = (newValue) => {
    setLanguage(newValue);
    setIsLanguagePopOpen(false)
  }

  const handleLanguagePopOpen= () => {
    setIsLanguagePopOpen(open => !open)
  }
  // end change

  const movieSource = {
    geo: {sd: movie, hd: 'm1'},
    eng: {sd: movie, hd: 'm1'},
    rus: {sd: movie, hd: 'm1'},
  }

  return (
    <div ref={fullscreenRef} className='w-full h-full relative'>
      <ReactPlayer 
      ref={playerRef}
        width='100%'
        height='100%'
        url={movie}
        playing={isPlaying}
        muted={isMute}
        volume={volume}
      />

      <div className='absolute top-0 right-0 left-0 bottom-0 bg-black opacity-30'></div>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-start gap-10'>
          <div onClick={handlePlaying}>{isPlaying ? <Pause fontSize='large' /> : <PlayArrow fontSize='large' />}</div>
      </div>
      <div className='absolute right-0 left-0 bottom-0 w-[95%] mx-auto'>
        <div>
        <Slider size='medium' defaultValue={20} aria-label="Default" valueLabelDisplay="auto" className='' />
        </div>
        <div className='p-2 flex justify-between'>
          <div className='flex justify-start gap-5 items-center'>
            <div onClick={handlePlaying} className='text-white'>{isPlaying ? <Pause fontSize='large' /> : <PlayArrow fontSize='large' />}</div>
            <div onClick={handleRewind} className='text-white'><FastRewind fontSize='large' /></div>
            <div onClick={handleFastForward} className='text-white'><FastForward fontSize='large' /></div>
            <div  onMouseEnter={() => setVolumeIsHidden(false)} onMouseLeave={() => setVolumeIsHidden(true)} className='relative flex gap-5 items-center justify-start'>
              <div onClick={handleMute}>{isMute ? <VolumeOff fontSize='large' /> : <VolumeUp fontSize='large' />}</div>
              <div className={`w-20 flex items-center ${volumeIsHidden && 'hidden'}`}>
              <Slider value={Math.round(volume * 100)}  aria-label="Default" valueLabelDisplay="auto" onChange={handleVolumeChange} onChangeCommitted={handleVolumeSeekUp} />
              </div>
            </div>
            <div>01:05:05</div>
          </div>
          <div className='flex justify-end gap-5 items-center'>
            <div className='relative flex flex-col items-center p-3 bg-black'>
              <button onClick={handleQualityPopOpen}>{quality}</button>
              <div className={`${!isQualityPopOpen && 'hidden'} absolute p-3 bottom-10 left-0  flex flex-col items-center gap-3 bg-black`}>
                {['sd', 'hd'].map((qua, i) => (
                  <button onClick={() => handleQualityPop(qua)} key={i}>{qua}</button>
                ))}
              </div>
            </div>
            <div className='relative flex flex-col items-center p-3 bg-black'>
              <button onClick={handleLanguagePopOpen}>{language}</button>
              <div className={`${!isLanguagePopOpen && 'hidden'} absolute p-3 bottom-10 left-0  flex flex-col items-center gap-3 bg-black`}>
                {['geo','eng','rus'].map((lang, i) => (
                  <button onClick={() => handleLanguagePop(lang)} key={i}>{lang}</button>
                ))}
              </div>
            </div>
            <div onClick={toggleFullscreen}><Fullscreen fontSize='large' /></div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default VideoPlayer;
