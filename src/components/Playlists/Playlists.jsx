import React from 'react';
import { FaPlus } from "react-icons/fa";
import './Playlists.css';

const Playlists = ({ playlists, onSelectPlaylist, selectedPlaylist }) => {

    return (
        <div className="playlist-container">
            <button
                className={`all-tracks ${!selectedPlaylist ? 'green' : ''}`}
                onClick={() => onSelectPlaylist(null)}>

                <h2>Todas as Faixas</h2>
            </button>
            <hr />
            <div className='my-playlists-header'>
                <h2>Minhas Playlists</h2>
                <button ><FaPlus size="22" /></button>
            </div>
            <ul className='playlist-list'>
                {playlists.map((playlist, index) => (
                    <li
                        key={index}
                        onClick={() => onSelectPlaylist(playlist.id)}
                        className={`playlist-list-item ${selectedPlaylist && selectedPlaylist.id === playlist.id ? 'green' : ''}`}
                    >
                        {playlist.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Playlists;