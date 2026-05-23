<div className={`music-player-card ${isDarkMode ? 'dark' : 'light'}`}>
  <div className="header">
    <span className="album-title">Punisher</span>
    <span className="album-year">2020</span>
    <button className="heart-icon">♥</button>
  </div>
  <div className="now-playing">
    <img src={albumArt} alt="Album Art" className="album-art" />
    <div className="progress-bar">
      {/* Progress bar implementation */}
    </div>
    <div className="controls">
      {/* Shuffle, Prev, Play/Pause, Next, More */}
    </div>
    <div className="song-info">
      <span className="song-title">I Know The End</span>
      <span className="artist-name">Phoebe Bridgers</span>
    </div>
  </div>
</div>
