import React, { useState, useEffect } from 'react';
import '../App.css';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Player from '../components/Player/Player';
import Playlists from '../components/Playlists/Playlists';
import Tracks from '../components/Tracks/Tracks';
import { getPlaylists, getAllTracks } from '../services/Api';

const Home = () => {
    const [isLoadingTracks, setIsLoadingTracks] = useState(false);
    const [isLoadingPlaylists, setIsLoadingPlaylists] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [allTracks, setAllTracks] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(null);

    const handleSelectPlaylist = (playlist) => {
        if (playlist) {
            const selectedPlaylist = playlists.find((p) => playlist === p.id);
            setSelectedPlaylist(selectedPlaylist);
            setTracks(selectedPlaylist.tracks);
        } else {
            setSelectedPlaylist(null);
            setTracks(allTracks);
        }
    };

    const handleSelectTrack = (track) => {
        if (track) {
            const selectedTrack = tracks.find((t) => track === t.id);
            setCurrentTrack(selectedTrack);
        } else {
            setCurrentTrack(null);
        }
    };

    useEffect(() => {
        setIsLoadingTracks(true);
        setIsLoadingPlaylists(true);

        getPlaylists()
            .then((result) => {
                setIsLoadingPlaylists(false);
                setPlaylists(result.playlists);
            })
            .catch((err) => {
                console.log(err);
            });

        getAllTracks()
            .then((result) => {
                setIsLoadingTracks(false)
                setAllTracks(result.tracks);
            })
            .catch((err) => {
                console.log(err);
            });

            handleSelectPlaylist(selectedPlaylist);
    }, []);

    return (
        <div className="Home">
            <Navbar />
            <div className="app-container">
                {isLoadingPlaylists ? <></> :
                    (<Playlists playlists={playlists} onSelectPlaylist={handleSelectPlaylist} selectedPlaylist={selectedPlaylist} />) 
                }
                {isLoadingTracks ? <></> :
                    (<Tracks tracks={tracks} currentTrack={currentTrack} onSelectTrack={handleSelectTrack} />)
                }
                <Player currentTrack={currentTrack} />
            </div>
            <Footer />
        </div>
    );
}

export default Home;