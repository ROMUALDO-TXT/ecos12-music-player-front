/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './UploadTrackForm.css';
import loadingGif from '../../assets/loading.gif';
import { uploadTrack } from "../../services/Api";

export default function UploadTrackForm({ onRequestUploadClose }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const formik = useFormik({
        initialValues: {
            title: "",
            artist: "",
            file: null
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Digite um título para a música'),
            artist: Yup.string().required('Digite o nome do artista'),
            file: Yup.mixed().required('Escolha um arquivo de música')
        }),
        onSubmit: async (values) => {
            setError("");
            setIsLoading(true);

            const formData = new FormData();
            formData.append("name", values.title);
            formData.append("artist", values.artist);
            formData.append("file", values.file);

            uploadTrack(formData).then((result) => {
                if (result.statusCode === 201) {
                    setIsLoading(false);
                    onRequestUploadClose(false);
                    window.location.reload();
                } else {
                    setError(result.message || "Ocorreu um erro inesperado. Tente novamente mais tarde");
                }
            }).catch((err) => {
                setError("Ocorreu um erro inesperado. Tente novamente mais tarde");
            });
        

            setIsLoading(false);
        }
    });

    return (
        <div className="Background-upload-track">
            <div className="UploadTrackContent">
                <div className="closeBtn">
                    <button type="button" onClick={() => onRequestUploadClose(false)}>
                        X
                    </button>
                </div>
                <form className="form-upload-track" onSubmit={formik.handleSubmit}>
                    <h2>Adicionar uma nova faixa</h2>
                    {error !== "" ? <span className="error-span"> {error} </span> : null}
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={formik.values.title}
                        placeholder="Título da Música"
                        onChange={formik.handleChange}
                    />
                    {formik.touched.title && formik.errors.title ? (
                        <div className="error">{formik.errors.title}</div>
                    ) : null}
                    <input
                        type="text"
                        id="artist"
                        className="form-control"
                        placeholder="Artista"
                        value={formik.values.artist}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.artist && formik.errors.artist ? (
                        <div className="error">{formik.errors.artist}</div>
                    ) : null}
                    <input
                        type="file"
                        id="file"
                        className="form-control"
                        onChange={(event) => formik.setFieldValue("file", event.currentTarget.files[0])}
                    />
                    {formik.touched.file && formik.errors.file ? (
                        <div className="error">{formik.errors.file}</div>
                    ) : null}

                    <button type="submit" className="btn-submit" disabled={isLoading}>
                        <span>
                            {isLoading ? <img src={loadingGif} alt="carregando" height="16px" width="16px" /> : "Upload"}
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
};