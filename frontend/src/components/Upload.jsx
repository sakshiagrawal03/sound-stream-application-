import React, { useState } from 'react';
import '../styles/Upload.css';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Upload = () => {
const [title, setTitle] = useState('');
const [artist, setArtist] = useState('');
const [audioFile, setAudioFile] = useState(null);
const dispatch = useDispatch();
const navigate = useNavigate();

const handleSubmit=(e)=>{
  e.preventDefault();
  
  const formData = new FormData();
  formData.append('title', title);
  formData.append('artist', artist);
  formData.append('audio',document.querySelector("#audioInput").files[0] ); // Use the selected audio file from state
        // In a real app, you would upload the files to a server here
        // For now, we'll just add the song to the Redux store
        
        axios.post('http://localhost:3000/songs/upload', formData,
          { withCredentials:true}
        )
        .then(response=>{
          console.log(response.data);
          navigate('/'); // Redirect to home after upload
        }
          )}



  return (
    <div className="upload-container">
      <div className="upload-header-row">
        <span className="upload-back-arrow" style={{ fontSize: 42, fontWeight: 500, color: '#181818', verticalAlign: 'middle', cursor: 'pointer' }} onClick={()=>navigate('/')}>
          &#8592;
        </span>
        <h2 className="upload-title">Upload Music</h2>
      </div>
      <form  onSubmit={handleSubmit}  className="upload-form">
        <input
          type="text"
          className="upload-input"
          placeholder="Song Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="upload-input"
          placeholder="Artist Name"
          value={artist}
          onChange={e => setArtist(e.target.value)}
        />
        <div className="upload-btn-row">
          <button type="button" className="upload-btn-light" onClick={() => document.getElementById('audioInput').click()}>
            Upload Audio File
          </button>
          <input
            type="file"
            accept="audio/*"
            id="audioInput"
            style={{ display: 'none' }}
            onChange={e => setAudioFile(e.target.files[0])}
          />
          {audioFile && (
            <span style={{ marginLeft: '10px', color: '#333' }}>Selected: {audioFile.name}</span>
          )}
          
        
        </div>
        

        <div className="upload-bottom-btn-row">
          <button type="submit" className="upload-btn-dark">
            Upload Music
          </button>
        </div>
      </form>
    </div>
  );
};

export default Upload;
