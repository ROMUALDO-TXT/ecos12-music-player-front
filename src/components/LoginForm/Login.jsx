/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useFormik } from 'formik'
import { useAuth } from "../../contexts/AuthContext";
import * as Yup from 'yup';
import './Login.css'
import loadingGif from '../../assets/loading.gif'


export default function LoginForm({ onRequestLoginClose, onRequestRegisterClose, onRedefinePasswordClose }) {
    const { signIn } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Digite um e-mail válido').required('Digite um e-mail'),
            password: Yup.string().required('Digite uma senha'),
        }),
        onSubmit: async (e) => {

            setError("");
            setIsLoading(true);

            try {
                console.log(signIn);

                const response = await signIn(e.email, e.password);
                if (response.statusCode === 200) {
                    setIsLoading(false);
                    onRequestLoginClose(false);
                    window.location.reload();
                } else {
                    if (response.message) {
                        setError(response.message)
                    } else if (response.body) {
                        setError(response.body)
                    } else {
                        setError("Ocorreu um erro");
                        alert("Ocorreu um erro inesperado. Tente novamente mais tarde");
                    }
                }
            } catch (err) {
                setError("Ocorreu um erro");
                alert("Ocorreu um erro inesperado. Tente novamente mais tarde");
            }

            setIsLoading(false);
        }
    })

    return (
        <div className="Background-login">
            <div className="LoginContent">
                <div className="closeBtn">
                    <button type="button" onClick={() => onRequestLoginClose(false)} >
                        X
                    </button>
                </div>
                <form className="form-login" onSubmit={formik.handleSubmit}>
                    <h2>Login</h2>
                    {error !== "" ? <span className="error-span"> {error} </span> : null}
                    <input
                        type="text"
                        id="email"
                        className="form-control"
                        value={formik.values.email}
                        placeholder="E-mail"
                        onChange={formik.handleChange}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="error">{formik.errors.email}</div>
                    ) : null}
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Senha"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="error">{formik.errors.password}</div>
                    ) : null}

                    <button type="submit" className="btn-submit" disabled={isLoading}>
                        <span>
                            {isLoading ? <img src={loadingGif} alt="carregando" height="16px" width="16px" /> : "Entrar"}
                        </span>
                    </button>

                    <hr />
                    <span>
                        Não possui uma conta? <a onClick={() => { onRequestLoginClose(false); onRequestRegisterClose(true) }}>Cadastre-se!</a>
                    </span>
                </form>
            </div>
        </div>
    );
};