import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentSong, selectIsPlaying, togglePlayPause } from '../../Redux/Features/song.Slice.js';
import { useEffect } from 'react';


const NowPlayingBar = ({ audioRef, handleEnded }) => {
  const dispatch = useDispatch();
  const currentSong = useSelector(selectCurrentSong);
  const isPlaying = useSelector(selectIsPlaying);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      dispatch(togglePlayPause());
    } else {
      audioRef.current.play();
      dispatch(togglePlayPause());
    }
  };
  useEffect(() => {
  const handleKeyDown = (event) => {
    if (event.code === 'Space') {
      event.preventDefault(); // Prevent page scroll
      handlePlayPause();
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [handlePlayPause]);

  if (!currentSong) return null;

  return (
    <div className="now-playing-bar"
      style={{
        display: 'flex',
        alignItems: 'center',
        background: '#F7F7F7',
        borderRadius: '16px',
        padding: '12px 16px',
        margin: '0 8px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 56,
        minHeight: '64px',
        gap: '14px',
        zIndex: 100,
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <img 
        src={currentSong.poster} 
        alt={currentSong.title} 
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '10px',
          objectFit: 'cover',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontWeight: 600,
          fontSize: '1.08rem',
          color: '#181716',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          textAlign: 'left',
          display: 'block',
        }}>{currentSong.title}</div>
        <div style={{
          fontSize: '0.98rem',
          color: '#888',
          marginTop: '2px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          textAlign: 'left',
          display: 'block',
        }}>{currentSong.artist}</div>
      </div>
      {/* Play/Pause Button */}
      <button
        style={{
          background: '#181716',
          border: 'none',
          borderRadius: '50%',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          cursor: 'pointer',
          marginLeft: '8px',
          marginRight: '8px',
        }}
        onClick={handlePlayPause}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="4" height="12" rx="1.5" fill="#fff" />
            <rect x="18" y="10" width="4" height="12" rx="1.5" fill="#fff" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="13,10 24,16 13,22" fill="#fff"/>
          </svg>
        )}
      </button>
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onEnded={handleEnded}
        style={{ display: 'none' }}
      />
    </div>
  );
};
export default NowPlayingBar;
