import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSong, togglePlayPause, selectCurrentSong, selectIsPlaying, setFilteredSongs, selectFilteredSongs } from '../Redux/Features/song.Slice';
import NowPlayingBar from './NowPlayingBar';
import '../styles/Search.css';
import axios from 'axios';



const Search = () => {
  const dispatch = useDispatch();
  const currentSong = useSelector(selectCurrentSong);
  const isPlaying = useSelector(selectIsPlaying);
  const [searchText, setSearchText] = useState('');
  const audioRef = useRef(null);
  const filteredSongs = useSelector(selectFilteredSongs);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    axios.get(`http://localhost:3000/songs/search-songs?text=${text}`,
      { withCredentials: true }
    ).then((response => {
      dispatch(setFilteredSongs(response.data.songs));
    }));
  };

  const handlePlaySong = (song) => {
    dispatch(setCurrentSong(song));
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }, 100);
  };

  // Dummy handlers for prev/next/ended (replace with real logic as needed)
  const handlePrevSong = () => {};
  const handleNextSong = () => {};
  const handleEnded = () => {};

  return (
    
     <div className="search-container">
      {/* Search Bar */}
       <div className="search-back-arrow">
        <span className="upload-back-arrow" style={{ fontSize: 42, fontWeight: 500, color: '#181818', verticalAlign: 'middle', cursor: 'pointer' }} onClick={()=>navigate('/')}>
          &#8592;
        </span>
       </div>
      <div className="search-bar" >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7d6a5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input
          type="text"
          placeholder="Find in music"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>

      {/* Search Results */}
      <div className="search-results-list">
        {filteredSongs && filteredSongs.length > 0 ? (
          filteredSongs.map((song) => (
            <div key={song._id || song.id} className="search-result-item" onClick={() => handlePlaySong(song)} style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0'}}>
              <img src={song.image || song.poster} alt={song.title} style={{width: 48, height: 48, borderRadius: 8, objectFit: 'cover'}} />
              <div style={{flex: 1}}>
                <div style={{fontWeight: 600, fontSize: '1.05rem'}}>{song.title}</div>
                <div style={{fontSize: '0.95rem', color: '#888'}}>{song.artist}</div>
              </div>
            </div>
          ))
        ) : searchText.trim() !== '' ? (
          <div style={{padding: '16px', color: '#888'}}>No results found.</div>
        ) : null}
      </div>

      {/* Now Playing Bar */}
      <NowPlayingBar
        audioRef={audioRef}
        handlePrevSong={handlePrevSong}
        handleNextSong={handleNextSong}
        handleEnded={handleEnded}
      />

      {/* Bottom Navigation */}
      <div className="search-bottom-nav">
        <div
          className="search-bottom-nav-icon active"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          {/* Home icon - as in the image: filled, rounded, with a door */}
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 10.75C4 9.92 4.42 9.15 5.11 8.7L11.11 4.73C12.23 3.95 13.77 3.95 14.89 4.73L20.89 8.7C21.58 9.15 22 9.92 22 10.75V18C22 19.1 21.1 20 20 20H6C4.9 20 4 19.1 4 18V10.75Z" fill="#181716"/>
            <rect x="10" y="14" width="4" height="6" rx="1.2" fill="#fff"/>
          </svg>
        </div>
        <div
          className="search-bottom-nav-icon"
          onClick={() => navigate('/search')}
          style={{ cursor: 'pointer' }}
        >
          {/* Search icon */}
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#181716" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
        <div className="search-bottom-nav-icon">
          {/* Bookmark icon */}
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#181716" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
        </div>
        <div className="search-bottom-nav-icon">
          {/* User icon */}
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#181716" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.38 8.38 0 0 1 13 0"/></svg>
        </div>
      </div>
    </div>
  );
};



export default Search;
