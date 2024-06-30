import { React, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const Player = ({ currentTrack }) => {
    const [audioUrl, setAudioUrl] = useState(null);

    useEffect(() => {
        const fetchAudioStream = async () => {
            try {
                const response = await fetch(`/stream/${currentTrack.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // Assuming the response body is the audio stream URL
                const audioBlob = await response.blob();
                const url = URL.createObjectURL(audioBlob);
                setAudioUrl(url);
            } catch (error) {
                console.error('Error fetching audio stream:', error);
                // Handle error (e.g., show error message)
            }
        };

        fetchAudioStream();

        // Clean up URL object when component unmounts
        return () => {
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
        };
    }, [currentTrack]);

    return (
        <div className="player-container">

            {currentTrack ? (
                <div className='display'>
                    <h3>{currentTrack.name}</h3>
                    <h5>{currentTrack.artist}</h5>
                </div>
            ) : (
                <div className='display' />
            )}
            
            {audioUrl && (
                <ReactPlayer
                    url={audioUrl}
                    controls
                    width="100%"
                    height="50px"
                    config={{
                        file: {
                            forceAudio: true
                        }
                    }}
                />
            )}
        </div>
    );
};

export default Player;