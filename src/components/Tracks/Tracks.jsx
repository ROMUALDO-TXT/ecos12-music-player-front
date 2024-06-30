import React from 'react';
import './Tracks.css';
import { FaPlus, FaTimes } from "react-icons/fa";
import { BiAlbum } from "react-icons/bi";


const Tracks = ({
  tracks,
  playlists,
  currentTrack,
  selectedPlaylist,
  onSelectTrack,
  onRequestUploadTrackOpen,
  onAddToPlaylist,
  onRemoveFromPlaylist
}) => {
  console.log(selectedPlaylist)

  return (
    <div className="tracks-container">
      <div className='tracks-header'>
        <h2>Faixas</h2>
        <button onClick={() => { onRequestUploadTrackOpen(true) }} ><BiAlbum size="22" /></button>
      </div>
      <hr />
      <ol className='track-list'>
      {tracks && tracks.length > 0 ? tracks.map((track, index) => (
          <li key={index}
            onClick={() => onSelectTrack(track.id)}
            className={`track-list-item ${currentTrack && currentTrack.id === track.id ? 'green' : ''}`}
          >
            <div className="track">
              <div className='track-data'>
                <p className='track-name'>{track.name} - {track.artist}</p>
              </div>
              {selectedPlaylist ? (
                <button className='remove-track' onClick={() => { onRemoveFromPlaylist(selectedPlaylist.id, track.id) }} ><FaTimes size="22" /></button>
              ) : (
                <div className='dropdown'>
                  <button className='dropdown-button'>Adicionar à playlist</button>
                  <div className='dropdown-content'>
                    {playlists ? playlists.map((playlist, idx) => (
                      <div key={idx} className='dropdown-item' onClick={() => onAddToPlaylist(playlist.id, track.id)}>
                        {playlist.name}
                      </div>
                    )) : null}
                  </div>
                </div>
              )}
            </div>
          </li>
      )) : (
        selectedPlaylist ?
        (<p>Adicione novas músicas á sua Playlist!</p>) :
        (<p>Adicione novas músicas biblioteca virtual!</p>)
      )}
      
      </ol>
    </div>
  );
};

export default Tracks;