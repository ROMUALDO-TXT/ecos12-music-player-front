/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useFormik } from 'formik';
import { useAuth } from "../../contexts/AuthContext";
import * as Yup from 'yup';
import loadingGif from '../../assets/loading.gif'
import './Register.css'

export default function RegisterForm({ onRequestLoginClose, onRequestRegisterClose }) {
    const { signUp } = useAuth()

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const formik = useFormik({
        initialValues: {
            name: "",
            registerEmail: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().min(2, 'O nome deve ter no mínimo 3 caractéres').max(200, 'Limite de caracteres atingido').required('Digite seu nome'),
            registerEmail: Yup.string().email('Digite um e-mail válido').required('Digite um e-mail'),
            password: Yup.string().required('Digite uma senha').test('len', 'A senha deve possuir no minimo 6 caracteres', val => val && val.length >= 6),
        }),
        onSubmit: async (e) => {
            setError("");
            setIsLoading(true);

            try {
                const response = await signUp({
                    name: e.name,
                    email: e.registerEmail,
                    password: e.password,
                });
                if (response.statusCode === 201) {
                    setIsLoading(false);
                    onRequestRegisterClose(false);
                    window.location.reload();
                } else {
                    if (response.message) {
                        if (Array.isArray(response.message)) {
                            setError(response.message.map((message) => {
                                if (message.substring(0, 5) === "Erro:") {
                                    return message + ' ';
                                }
                                return ''
                            }))
                        } else {
                            setError(response.message);
                        }
                    } else if (response.body) {
                        setError(response.body)
                    } else {
                        setError("Ocorreu um erro");
                        alert("Ocorreu um erro inesperado. Tente novamente mais tarde");
                    }
                }
            } catch (err) {
                console.log(err)
                setError("Ocorreu um erro");
                alert("Ocorreu um erro inesperado. Tente novamente mais tarde");
            }

            setIsLoading(false);
        }
    });

    return (
        <div className="Background-register">
            <div className="RegisterContent">
                <div className="closeBtn">
                    <button type="button" onClick={() => onRequestRegisterClose(false)}>
                        X
                    </button>
                </div>
                <form className="form-login" onSubmit={formik.handleSubmit}>
                    <h2>Cadastro</h2>
                    {error !== "" ? <span className="error-span"> {error} </span> : null}

                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={formik.values.name}
                        placeholder="Nome"
                        onChange={formik.handleChange}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="error">{formik.errors.name}</div>
                    ) : null}

                    <input
                        type="text"
                        id="registerEmail"
                        className="form-control"
                        value={formik.values.registerEmail}
                        placeholder="E-mail"
                        onChange={formik.handleChange}
                    />
                    {formik.touched.registerEmail && formik.errors.registerEmail ? (
                        <div className="error">{formik.errors.registerEmail}</div>
                    ) : null}

                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={formik.values.password}
                        placeholder="Senha"
                        onChange={formik.handleChange}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="error">{formik.errors.password}</div>
                    ) : null}
                    <button type="submit" className="btn-submit" disabled={isLoading}>
                        <span>
                            {isLoading ? <img src={loadingGif} alt="carregando" height="16px" width="16px" /> : "Cadastrar"}
                        </span>
                    </button>

                    <hr />
                    <span>
                        Já possui uma conta? <a onClick={() => { onRequestLoginClose(true); onRequestRegisterClose(false) }}>Entrar</a>
                    </span>
                </form>
            </div>
        </div>
    );
};