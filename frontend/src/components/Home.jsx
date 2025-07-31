
import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSongs, selectCurrentSong, selectIsPlaying, setCurrentSong, togglePlayPause, setSongs } from '../Redux/Features/song.Slice';
import '../styles/Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import NowPlayingBar from './NowPlayingBar';

const Home = () => {
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const songs = useSelector(selectSongs);
  const currentSong = useSelector(selectCurrentSong);
  const isPlaying = useSelector(selectIsPlaying);
  const navigate = useNavigate();


  // Play/Pause handler
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

  // Next song handler (auto play)
  const handleNextSong = () => {
    if (!songs.length) return;
    const idx = songs.findIndex(song => song.id === currentSong.id);
    const nextIdx = (idx + 1) % songs.length;
    dispatch(setCurrentSong(songs[nextIdx]));
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }, 0);
  };

  // Previous song handler (auto play)
  const handlePrevSong = () => {
    if (!songs.length) return;
    const idx = songs.findIndex(song => song.id === currentSong.id);
    const prevIdx = (idx - 1 + songs.length) % songs.length;
    dispatch(setCurrentSong(songs[prevIdx]));
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }, 0);
  };

  // Pause when audio ends
  const handleEnded = () => {
    if (isPlaying) dispatch(togglePlayPause());
  };

  useEffect(()=>{

    axios.get("http://localhost:3000/songs/get", {
      withCredentials: true
    })
    .then(response => {
      console.log(response.data);
      dispatch(setSongs(response.data.songs));
      
    })

  },[])

  return (
    <div className="home-container">
      {/* Header */}
      <div className="home-header">
        <span className="icon-music-upload" title="Music" margintop="10px" style={{ cursor: 'pointer' }} onClick={() => navigate('/upload')}>
          <img width="35px" src="https://img.icons8.com/ios-filled/50/add-song.png" alt="add-song"  />
         
         
        </span>
        <span className="home-title">Stream</span>
        <span className="icon-search" title="Search" style={{ cursor: 'pointer' }} onClick={() => navigate('/search')}>
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#181716" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
      </div>

      {/* Song List */}
      <div className="song-list">
        {songs.map((song, idx) => (
          <div
            className="song-item"
            key={song.id || idx}
            onClick={() => {
              dispatch(setCurrentSong(song));
              setTimeout(() => {
                if (audioRef.current) {
                  audioRef.current.currentTime = 0;
                  audioRef.current.play();
                }
              }, 0);
            }}
            style={{ cursor: 'pointer' }}
          >
            <img src={song.poster} alt={song.title} className="song-img" />
            <div className="song-info">
              <div className="song-title">{song.title}</div>
              <div className="song-artist">{song.artist}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Now Playing Bar */}
      <NowPlayingBar
        audioRef={audioRef}
        handlePrevSong={handlePrevSong}
        handleNextSong={handleNextSong}
        handleEnded={handleEnded}
      />

      {/* Bottom Nav */}
      <div className="bottom-nav">
        {/* Home icon (active) */}
        <span className="nav-icon active" title="Home" style={{ cursor: 'pointer' }} onClick={() => navigate('/') }>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 10.75C4 9.92 4.42 9.15 5.11 8.7L11.11 4.73C12.23 3.95 13.77 3.95 14.89 4.73L20.89 8.7C21.58 9.15 22 9.92 22 10.75V18C22 19.1 21.1 20 20 20H6C4.9 20 4 19.1 4 18V10.75Z" fill="#181716"></path>
            <rect x="10" y="14" width="4" height="6" rx="1.2" fill="#fff"></rect>
          </svg>
        </span>
        {/* Search icon */}
        <span className="nav-icon" title="Search" style={{ cursor: 'pointer' }} onClick={() => navigate('/search')}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#181716" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
        {/* Bookmark icon */}
        <span className="nav-icon" title="Bookmarks">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#181716" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </span>
        {/* User icon */}
        <span className="nav-icon" title="Profile">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#181716" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="7" r="4"></circle>
            <path d="M5.5 21a8.38 8.38 0 0 1 13 0"></path>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default Home;
