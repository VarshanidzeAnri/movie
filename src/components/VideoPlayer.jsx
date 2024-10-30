import ReactPlayer from 'react-player';
import movie from './../../public/movies/m1.mp4';
import { Slider } from '@mui/material';
import { FastForward, FastRewind, Fullscreen, Pause, PlayArrow, VolumeOff, VolumeUp } from '@mui/icons-material';
import { useRef, useState } from 'react';
import screenfull from 'screenfull';


function VideoPlayer() {
  // fullscreen
  const fullscreenRef = useRef();

  const toggleFullscreen = () => {
    screenfull.toggle(fullscreenRef.current)
  }

  // end fullscreen
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMute, setIsMute] = useState(false)

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

  return (
    <div ref={fullscreenRef} className='w-full h-full relative'>
      <ReactPlayer 
      ref={playerRef}
      // className='w-full h-full'
        width='100%'
        height='100%'
        url={movie}
        playing={isPlaying}
        muted={isMute}
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
            <div onClick={handleMute}>{isMute ? <VolumeOff fontSize='large' /> : <VolumeUp fontSize='large' />}</div>
            <div>01:05:05</div>
          </div>
          <div className='flex justify-end gap-5 items-center'>
            <div>sd</div>
            <div>geo</div>
            <div onClick={toggleFullscreen}><Fullscreen fontSize='large' /></div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default VideoPlayer;
