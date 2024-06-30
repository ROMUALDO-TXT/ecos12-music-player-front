/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './PlaylistForm.css';
import loadingGif from '../../assets/loading.gif';
import { createPlaylist } from "../../services/Api";

export default function PlaylistForm({ onRequestPlaylistClose }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const formik = useFormik({
        initialValues: {
            name: "",
            description: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Digite um nome para a playlist'),
            description: Yup.string().required('Digite uma descrição para a playlist'),
        }),
        onSubmit: async (values) => {
            setError("");
            setIsLoading(true);

            createPlaylist({ // Replace with your playlist creation function
                name: values.name,
                description: values.description,
            }).then((result) => {
                setIsLoading(false);
                onRequestPlaylistClose(false);
                window.location.reload();
            }).catch((err) => {
                console.log(err);
                setError("Ocorreu um erro inesperado. Tente novamente mais tarde");
            })
        }
    });

    return (
        <div className="Background-CreatePlaylist">
            <div className="CreatePlaylistContent">
                <div className="closeBtn">
                    <button type="button" onClick={() => onRequestPlaylistClose(false)}>
                        X
                    </button>
                </div>
                <form className="form-create-playlist" onSubmit={formik.handleSubmit}>
                    <h2>Criar Nova Playlist</h2>
                    <div className="row form-group">
                        {error !== "" ? <span className="error-span"> {error} </span> : null}
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            value={formik.values.name}
                            placeholder="Nome da Playlist"
                            onChange={formik.handleChange}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="error">{formik.errors.name}</div>
                        ) : null}
                        <input
                            type="text"
                            id="description"
                            className="form-control"
                            placeholder="Descrição da Playlist"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.description && formik.errors.description ? (
                            <div className="error">{formik.errors.description}</div>
                        ) : null}

                    </div>
                    <button type="submit" className="btn-submit" disabled={isLoading}>
                        <span>
                            {isLoading ? <img src={loadingGif} alt="carregando" height="16px" width="16px" /> : "Criar"}
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
};