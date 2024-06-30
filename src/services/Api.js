import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
})
api.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

export const getPlaylists = async () => {
    try {
        const response = await api.get(`/playlists`);
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

export const getStream = async (id) => {
    try {
        const response = await api.get(`/stream/${id}`, {
            responseType: "blob"
        });
        console.log(response)
        return {
            statusCode: 200,
            stream: response.data,
        };
    } catch (err) {
        return err;
    }
}

export const createPlaylist = async (data) => {
    try {
        const response = await api.post(`/playlists`,
            data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response)
        return {
            statusCode: response.status,
            stream: response.data,
        };
    } catch (err) {
        return err;
    }
}

export const uploadTrack = async (data) => {
    try {
        const response = await api.post(`/tracks/upload`,
            data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        console.log(response)
        return {
            statusCode: response.status,
            stream: response.data,
        };
    } catch (err) {
        return err;
    }
}

export const addTrackToPlaylist = async (data) => {
    try {
        const response = await api.post(`/playlists/add`,
            data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response)
        return {
            statusCode: response.status,
            stream: response.data,
        };
    } catch (err) {
        return err;
    }
}

export const removeTrackFromPlaylist = async (data) => {
    try {
        const response = await api.post(`/playlists/remove`,
            data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response)
        return {
            statusCode: response.status,
            stream: response.data,
        };
    } catch (err) {
        return err;
    }
}
