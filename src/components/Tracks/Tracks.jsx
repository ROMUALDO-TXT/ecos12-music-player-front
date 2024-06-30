import React from 'react';

const Tracks = ({ tracks, currentTrack, onSelectTrack }) => {
  return (
    <div className="tracks-container">
      <h2>Faixas</h2>
      <hr/>
      <ol className='track-list'>
        {tracks.map((track, index) => (
          <li key={index}
            onClick={() => onSelectTrack(track.id)}
            className={`track-list-item ${currentTrack && currentTrack.id === track.id ? 'green' : ''}`}
          >
            {track.name} - {track.artist} {currentTrack && currentTrack.id === track.id ? <p className='current-playing'> tocando agora</p> : <></>}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Tracks;