import { createContext, useEffect, useContext } from "react";
import { useCookies } from 'react-cookie'
import { api } from '../services/Api';
import { AxiosError } from "axios";

export const AuthContext = createContext({});

export function AuthProvider(props) {
    const [cookies, setCookie, removeCookie] = useCookies(['music-app-token', 'music-app-user']);

    useEffect(() => {
        api.defaults.headers['Authorization'] = `Bearer ${cookies["music-app-token"]}`;
    }, [cookies])

    const signOut = () => {
        api.defaults.headers['authorization'] = '';
        removeCookie('music-app-token', {
            path: '/'
        });
        removeCookie('music-app-user', {
            path: '/'
        });

        window.location.reload();
    }


    const signIn = async (email, password) => {
        try {

            console.log('signIn')

            const response = await api.post('/users/login', {
                email,
                password
            })

            const { token } = response.data;

            setCookie('music-app-token', response.data.token, {
                maxAge: 60 * 60 * 24 * 10,
                path: '/',
            });
            setCookie('music-app-user', response.data.user, {
                maxAge: 60 * 60 * 24 * 10,
                path: '/',
            });

            api.defaults.headers['Authorization'] = `Bearer ${token}`;

        } catch (err) {
            if (err instanceof AxiosError) {
                return err.response.data;
            }
        }
        return {
            statusCode: 200,
            body: "success"
        };
    }

    const signUp = async ({ name, cpf, email, phone, password }) => {
        try {
            const response = await api.post('/users/register', {
                name,
                email,
                password
            })

            setCookie('music-app-token', response.data.token, {
                maxAge: 60 * 60 * 24 * 10,
                path: '/',
            });
            setCookie('music-app-user', response.data.user, {
                maxAge: 60 * 60 * 24 * 10,
                path: '/',
            });


            api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;


        } catch (err) {
            if (err instanceof AxiosError) {

                return err.response.data;
            }
        }
        return {
            statusCode: 201,
            body: "success"
        };
    }

    const isAuthenticated = () => {
        if (cookies['music-app-user'] && cookies['music-app-user'] !== "") {
            return true;
        } else {
            return false;
        }
    }


    return (
        <AuthContext.Provider value={{ signIn, signOut, signUp, isAuthenticated }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}