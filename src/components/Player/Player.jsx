import { React, useEffect, useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { getStream } from '../../services/Api';
import cover from '../../assets/placeholder.png';
import './Player.css'
import { MdSkipPrevious, MdSkipNext, MdPlayArrow, MdPause } from "react-icons/md";

const Player = ({
    currentTrack,
    onPrevious,
    onNext,
}) => {
    const playerRef = useRef(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(0);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleDuration = duration => {
        setDuration(duration);
    };

    const handleProgress = state => {
        setPlayed(state.played);
        setPlayedSeconds(state.playedSeconds);
        if (state.playedSeconds == duration) onNext();
    };

    const handleSeekChange = e => {
        setPlayed(parseFloat(e.target.value));
        playerRef.current.seekTo(parseFloat(e.target.value));
    };

    const formatDuration = seconds => {
        const format = val => `0${Math.floor(val)}`.slice(-2);
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${hours}:${format(mins)}:${format(secs)}`;
    };


    useEffect(() => {
        if (currentTrack) {

            getStream(currentTrack.id).then((result) => {
                if (!result.stats === 200) {
                    throw new Error('Network response was not ok');
                }
                // const audioBlob = result.stream.blob();
                const url = URL.createObjectURL(result.stream);
                setAudioUrl(url);
            })

            // Clean up URL object when component unmounts
        }
    }, [currentTrack]);

    return (
        <div className="player-container">
            <div class="music-player">

                <div class="cover">
                    <img src={cover} alt="Album Cover" />
                </div>
                {currentTrack ? (
                    <div class="info">
                        <h2>{currentTrack.name}</h2>
                        < h3>{currentTrack.artist}</h3>
                    </div>
                ) : (
                    <div className='info' />
                )}

                {audioUrl ? (
                    <div className="player">
                        <ReactPlayer
                            ref={playerRef}
                            className="audio"
                            url={audioUrl}
                            playing={isPlaying}
                            controls={false}
                            width="100%"
                            height="10px"
                            onProgress={handleProgress}
                            onDuration={handleDuration}
                            config={{
                                file: {
                                    forceAudio: true
                                }
                            }}
                        />
                        <div className="time-bar">
                            <span>{formatDuration(playedSeconds)}</span>
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step="any"
                                value={played}
                                onChange={handleSeekChange}
                            />
                            <span>{formatDuration(duration)}</span>
                        </div>
                        <div className="controls">
                            <button className='previous' onClick={onPrevious}><MdSkipPrevious size="22" /></button>
                            <button className='play' onClick={handlePlayPause}>{isPlaying ? <MdPause size="22" /> : <MdPlayArrow size="22" />}</button>
                            <button className='next' onClick={onNext}><MdSkipNext size="22" /></button>
                        </div>
                    </div>
                ) : (<p className='no-track'> Escolha uma música para tocar! </p>)}
            </div>
        </div>
    );
};

export default Player;