import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const Player = () => {
  const {track, seekBg, seekBar, playStatus, play, pause, time, previous, next, seekSong} = useContext(PlayerContext);

  return track ? (
    <div className="h-[10%] bg-black text-white px-4 flex items-center justify-between">

      {/* Current Song Info */}
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12 rounded" src={track.image} alt={track.name} />
        <div>
          <p className="font-semibold">{track.name}</p>
          <p className="text-sm text-gray-400">{track.desc.slice(0, 12)}</p>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex flex-col items-center gap-2 m-auto">
        
        {/* Main Controls */}
        <div className="flex gap-4">
          <img className="w-4 cursor-pointer" src={assets.shuffle_icon} alt="Shuffle" />
          <img onClick={previous} className="w-4 cursor-pointer" src={assets.prev_icon} alt="Previous" />

          {playStatus 
          ?<img onClick={pause} className="w-4 cursor-pointer" src={assets.pause_icon} alt="Pause" /> 
          :<img onClick={play} className="w-4 cursor-pointer" src={assets.play_icon} alt="Play" />
          }
          <img onClick={next} className="w-4 cursor-pointer" src={assets.next_icon} alt="Next" />
          <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="Loop" />
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-5 w-full px-4">
          <p className="text-sm">{time.currentTime.minute}:{time.currentTime.second}</p>
          <div ref={seekBg} onClick={seekSong} className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer">
            <hr ref={seekBar} className="h-1 border-none w-0 bg-green-800 rounded-full" />
          </div>
          <p className="text-sm">{time.totalTime.minute}:{time.totalTime.second}</p>
        </div>

      </div>

      {/* Additional Controls */}
      <div className="hidden lg:flex items-center gap-2 opacity-75">

        <img className="w-4 cursor-pointer" src={assets.plays_icon} alt="Plays" />
        <img className="w-4 cursor-pointer" src={assets.mic_icon} alt="Mic" />
        <img className="w-4 cursor-pointer" src={assets.queue_icon} alt="Queue" />
        <img className="w-4 cursor-pointer" src={assets.speaker_icon} alt="Speaker" />
        <img className="w-4 cursor-pointer" src={assets.volume_icon} alt="Volume" />

        {/* Volume Bar */}
        <div className="w-20 bg-slate-50 h-1 rounded overflow-hidden">
          <div className="h-1 bg-green-800 w-0"></div>
        </div>

        <img className="w-4 cursor-pointer" src={assets.mini_player_icon} alt="Mini Player" />
        <img className="w-4 cursor-pointer" src={assets.zoom_icon} alt="Zoom" />

      </div>

    </div>
  ) : null;
};

export default Player;
