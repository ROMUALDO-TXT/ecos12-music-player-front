import React from 'react';
import { FaPlus } from "react-icons/fa";
import './Playlists.css';

const Playlists = ({ playlists, onSelectPlaylist, selectedPlaylist, onRequestCreatePlaylistOpen }) => {

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
                <button onClick={() => { onRequestCreatePlaylistOpen(true) }} ><FaPlus size="22" /></button>
            </div>
            <ol className='playlist-list'>
                {playlists && playlists.length < 0 ? playlists.map((playlist, index) => (
                    <li
                        key={index}
                        onClick={() => onSelectPlaylist(playlist.id)}
                        className={`playlist-list-item ${selectedPlaylist && selectedPlaylist.id === playlist.id ? 'green' : ''}`}
                    >
                        {playlist.name}
                    </li>
                )) : <p className='no-playlists'>Você não tem playlists. <br/> Crie uma agora mesmo!</p>}
            </ol>
        </div>
    );
};

export default Playlists;