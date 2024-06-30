import React, { useState, useEffect } from 'react';
import '../App.css';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Player from '../components/Player/Player';
import Playlists from '../components/Playlists/Playlists';
import Tracks from '../components/Tracks/Tracks';
import PlaylistForm from '../components/PlaylistForm/PlaylistForm';
import UploadTrackForm from '../components/UploadTrackForm/UploadTrackForm';
import { getPlaylists, getAllTracks, addTrackToPlaylist, removeTrackFromPlaylist } from '../services/Api';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
    const [isLoadingTracks, setIsLoadingTracks] = useState(false);
    const [isLoadingPlaylists, setIsLoadingPlaylists] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [allTracks, setAllTracks] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isCreatePlaylistOpen, setIsCreatePlaylistOpen] = useState(false);
    const [isUploadTrackOpen, setIsUploadTrackOpen] = useState(false);
    const { isAuthenticated } = useAuth()
    const [authState,] = useState(isAuthenticated);

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

    const handleAddTrackToPlaylist = (playlistId, trackId) => {
        addTrackToPlaylist({
            playlistId: playlistId,
            trackId: trackId,
        }).then((result) => {
            window.location.reload()
        }).catch((error) => console.log(error));
    }

    const handleRemoveTrackFromPlaylist = (playlistId, trackId) => {
        removeTrackFromPlaylist({
            playlistId: playlistId,
            trackId: trackId,
        }).then((result) => {
            window.location.reload()
        }).catch((error) => console.log(error));
    }

    const handleNextTrack = () => {
        if (currentTrack) {
            const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
            if (currentIndex < tracks.length - 1) {
                setCurrentTrack(tracks[currentIndex + 1]);
            } else {
                setCurrentTrack(tracks[0]);
            }
            const nextIndex = (currentIndex + 1) % tracks.length;
            setCurrentTrack(tracks[nextIndex]);
        }
    };

    const handlePreviousTrack = () => {
        if (currentTrack) {
            const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
            if (currentIndex > 0) {
                setCurrentTrack(tracks[currentIndex - 1]);
            } else {
                setCurrentTrack(tracks[tracks.length - 1]);
            }
        }
    };

    useEffect(() => {
        if (authState) {
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
                    setTracks(result.tracks);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    return (
        <div className="Home">
            <Navbar />
            {authState ?
            (<div className="app-container">
                {isLoadingPlaylists ? <></> :
                    (<Playlists
                        playlists={playlists}
                        onSelectPlaylist={handleSelectPlaylist}
                        selectedPlaylist={selectedPlaylist}
                        onRequestCreatePlaylistOpen={setIsCreatePlaylistOpen}
                    />)
                }
                {isLoadingTracks ? <></> :
                    (<Tracks
                        tracks={tracks}
                        playlists={playlists}
                        currentTrack={currentTrack}
                        selectedPlaylist={selectedPlaylist}
                        onSelectTrack={handleSelectTrack}
                        onRequestUploadTrackOpen={setIsUploadTrackOpen}
                        onAddToPlaylist={handleAddTrackToPlaylist}
                        onRemoveFromPlaylist={handleRemoveTrackFromPlaylist}
                    />)
                }
                <Player currentTrack={currentTrack} onNext={handleNextTrack} onPrevious={handlePreviousTrack} />
                {isCreatePlaylistOpen && <PlaylistForm onRequestPlaylistClose={setIsCreatePlaylistOpen} />}
                {isUploadTrackOpen && <UploadTrackForm onRequestUploadClose={setIsUploadTrackOpen} />}
            </div>) : (
                <div className='unlogged-container'>
                    <h2>
                        É necessario fazer login para acessar a aplicação
                    </h2>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default Home;