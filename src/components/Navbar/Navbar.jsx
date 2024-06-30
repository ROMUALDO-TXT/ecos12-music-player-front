import React, { useState } from 'react';

import Login from '../LoginForm/Login';
import Register from '../RegisterForm/Register';

import icon from '../../assets/icon.png';
import './Navbar.css';
import { HiChevronDown } from "react-icons/hi";
import { useCookies } from 'react-cookie';
import { useAuth } from '../../contexts/AuthContext.js';

function Navbar() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [toggle, setToggle] = useState(true);
    const [dummy, setDummy] = useState(false);
    const [cookies] = useCookies(['music-app-user']);

    const { signOut } = useAuth()

    return (
        <>
            <div className={toggle ? 'Navbar-collapsed' : 'Navbar'}>
                <div className='navbar-menu'>
                    <div className="navbar--logo">
                        <img className='logo-plano' src={icon} alt="app" />
                        <h4>Music APP ECOS12</h4>
                    </div>


                    <div className='navbar--login'>
                         {cookies['music-app-user'] === undefined ? (
                            <div className='navbar--login-buttons'>
                                <button type="button" className='nav-button' onClick={() => { setIsLoginOpen(true) }} >Entrar</button>
                                <button type="button" onClick={() => { setIsRegisterOpen(true) }}>Cadastre-se</button>
                            </div>
                        ) : (
                            <div className="nav-user">
                                <p className="nav-name">Olá <b>{cookies['music-app-user'].name.split(' ')[0]}</b>!</p>
                                <button><p className="link-blue" onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    signOut();
                                    setDummy(!dummy);
                                }}>Sair</p></button>

                            </div>
                        )} 
                    </div>

                    <div className='toggler'>
                        <label className='toggler-icon' htmlFor="toggler"><HiChevronDown htmlFor="toggler"></HiChevronDown></label>
                        <input
                            type="checkbox"
                            className='toggler-checkbox'
                            id="toggler"
                            name="toggler"
                            defaultChecked={toggle}
                            onChange={(e) => {
                                //e.preventDefault();
                                e.stopPropagation();
                                setToggle(!toggle);
                                setDummy(!dummy);
                            }}
                        />
                    </div>


                    {isLoginOpen && <Login onRequestLoginClose={setIsLoginOpen} onRequestRegisterClose={setIsRegisterOpen} />}
                    {isRegisterOpen && <Register onRequestLoginClose={setIsLoginOpen} onRequestRegisterClose={setIsRegisterOpen} />}
                </div>

            </div>
        </>
    )
}

export default Navbar;