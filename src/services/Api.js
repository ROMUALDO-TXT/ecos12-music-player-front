import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
})
api.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

export const getPlaylists = async () => {
    try {
        const response = await api.get(`/playlists`);
        console.log(response)
        return {
            statusCode: 200,
            playlists: response.data,
        };
    } catch (err) {
        return err;
    }
}

export const getAllTracks = async () => {
    try {
        const response = await api.get(`/tracks`);
        return {
            statusCode: 200,
            tracks: response.data,
        };
    } catch (err) {
        return err;
    }
}



