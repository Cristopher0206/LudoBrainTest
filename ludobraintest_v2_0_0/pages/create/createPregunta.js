import {useEffect, useState} from "react";
import navstyles from "@/styles/navstyles.module.css";
import styles from "@/styles/styles.module.css";
import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import axios from "axios";
import {useRouter} from "next/router";

export default function CreatePregunta() {
    const dato = localStorage.getItem('dato');
    const router = useRouter();
    /*------------------- ESTADOS -------------------*/
    const [tipoInformacion, setTipoInformacion] = useState(false);
    const [tipoSemejanza, setTipoSemejanza] = useState(false);
    const [tipoVocabulario, setTipoVocabulario] = useState(false);
    const [tipoComprension, setTipoComprension] = useState(false);
    const [tipoDibujos, setTipoDibujos] = useState(false);
    const [tipoNombres, setTipoNombres] = useState(false);
    const [tipoMatrices, setTipoMatrices] = useState(false);
    const [tipoConceptos, setTipoConceptos] = useState(false);
    const [tipoReconocimiento, setTipoReconocimiento] = useState(false);
    const [tipoBusqueda, setTipoBusqueda] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false); // Estado para el mensaje de registro
    const [warningMessage, setWarningMessage] = useState(false); // Estado para la advertencia de registro
    /* Estados para los inputs */
    const [textareaValue, setTextareaValue] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState({});
    const [esMuestra, setEsMuestra] = useState([]);
    //const [rowNumber, setRowNumber] = useState(0);
    /* Estados para los inputs de Conceptos */
    const [selectedFiles1, setSelectedFiles1] = useState([]);
    const [selectedFiles2, setSelectedFiles2] = useState([]);
    const [selectedFiles3, setSelectedFiles3] = useState([]);
    /* Estados para los inputs de Semejanzas */
    const [imagenesMuestra, setImagenesMuestra] = useState([]);
    /*------------------- EFECTOS -------------------*/
    useEffect(() => { // useEffect para obtener el usuario de la sesión
        crearInterfaz();
    }, []);
    useEffect(() => {
    }, [selectedFiles]);
    /*------------------- FUNCIONES -------------------*/
    const clearFields = () => { /* Funciòn para limpiar los campos */
        setTextareaValue('');
        setSelectedFiles([]);
        setCorrectAnswers({});
    };
    const crearInterfaz = () => {
        switch (dato) {
            case 'Información':
                setTipoInformacion(true);
                setTipoSemejanza(false);
                setTipoVocabulario(false);
                setTipoComprension(false);
                setTipoDibujos(false);
                setTipoNombres(false);
                setTipoMatrices(false);
                setTipoConceptos(false);
                setTipoReconocimiento(false);
                setTipoBusqueda(false);
                break;
            case 'Semejanzas':
                setTipoSemejanza(true);
                setTipoInformacion(false);
                setTipoVocabulario(false);
                setTipoComprension(false);
                setTipoDibujos(false);
                setTipoNombres(false);
                setTipoMatrices(false);
                setTipoConceptos(false);
                setTipoReconocimiento(false);
                setTipoBusqueda(false);
                break;
            case 'Vocabulario':
                setTipoVocabulario(true);
                setTipoInformacion(false);
                setTipoSemejanza(false);
                setTipoComprension(false);
                setTipoDibujos(false);
                setTipoNombres(false);
                setTipoMatrices(false);
                setTipoConceptos(false);
                setTipoReconocimiento(false);
                setTipoBusqueda(false);
                break;
            case 'Comprensión':
                setTipoComprension(true);
                setTipoInformacion(false);
                setTipoSemejanza(false);
                setTipoVocabulario(false);
                setTipoDibujos(false);
                setTipoNombres(false);
                setTipoMatrices(false);
                setTipoConceptos(false);
                setTipoReconocimiento(false);
                setTipoBusqueda(false);
                break;
            case 'Dibujos':
                setTipoDibujos(true);
                setTipoInformacion(false);
                setTipoSemejanza(false);
                setTipoVocabulario(false);
                setTipoComprension(false);
                setTipoNombres(false);
                setTipoMatrices(false);
                setTipoConceptos(false);
                setTipoReconocimiento(false);
                setTipoBusqueda(false);
                break;
            case 'Nombres':
                setTipoNombres(true);
                setTipoInformacion(false);
                setTipoSemejanza(false);
                setTipoVocabulario(false);
                setTipoComprension(false);
                setTipoDibujos(false);
                setTipoMatrices(false);
                setTipoConceptos(false);
                setTipoReconocimiento(false);
                setTipoBusqueda(false);
                break;
            case 'Matrices':
                setTipoMatrices(true);
                setTipoInformacion(false);
                setTipoSemejanza(false);
                setTipoVocabulario(false);
                setTipoComprension(false);
                setTipoDibujos(false);
                setTipoNombres(false);
                setTipoConceptos(false);
                setTipoReconocimiento(false);
                setTipoBusqueda(false);
                break;
            case 'Conceptos':
                setTipoConceptos(true);
                setTipoInformacion(false);
                setTipoSemejanza(false);
                setTipoVocabulario(false);
                setTipoComprension(false);
                setTipoDibujos(false);
                setTipoNombres(false);
                setTipoMatrices(false);
                setTipoReconocimiento(false);
                setTipoBusqueda(false);
                break;
            case 'Reconocimiento':
                setTipoReconocimiento(true);
                setTipoInformacion(false);
                setTipoSemejanza(false);
                setTipoVocabulario(false);
                setTipoComprension(false);
                setTipoDibujos(false);
                setTipoNombres(false);
                setTipoMatrices(false);
                setTipoConceptos(false);
                setTipoBusqueda(false);
                break;
            case 'Búsqueda':
                setTipoBusqueda(true);
                setTipoInformacion(false);
                setTipoSemejanza(false);
                setTipoVocabulario(false);
                setTipoComprension(false);
                setTipoDibujos(false);
                setTipoNombres(false);
                setTipoMatrices(false);
                setTipoConceptos(false);
                setTipoReconocimiento(false);
                break;
        }
    }
    // Manejar el cambio de archivos para Información
    const handleChange = (event) => {
        setTextareaValue(event.target.value);
    };
    const handleFileChange = (event) => {
        const newFile = event.target.files[0];
        if (newFile) {
            setSelectedFiles((prevFiles) => [...prevFiles, newFile]);
        }
    };
    const handleFileChangeMuestra = (event) => {
        const newFile = event.target.files[0];
        if (newFile) {
            setImagenesMuestra((prevFiles) => [...prevFiles, newFile]);
        }
    }
    // Manejar el cambio de archivos para Conceptos
    const handleFileChangeConcept1 = (event) => {
        const newFile = event.target.files[0];
        if (newFile) {
            setSelectedFiles1((prevFiles) => [...prevFiles, newFile]);
            setSelectedFiles((prevFiles) => [...prevFiles, newFile]);
        }
        console.log("desde concept1", selectedFiles);
    };
    const handleFileChangeConcept2 = (event) => {
        const newFile = event.target.files[0];
        if (newFile) {
            setSelectedFiles2((prevFiles) => [...prevFiles, newFile]);
            setSelectedFiles((prevFiles) => [...prevFiles, newFile]);
        }
        console.log("desde concept2", selectedFiles);
    };
    const handleFileChangeConcept3 = (event) => {
        const newFile = event.target.files[0];
        if (newFile) {
            setSelectedFiles3((prevFiles) => [...prevFiles, newFile]);
            setSelectedFiles((prevFiles) => [...prevFiles, newFile]);
        }
        console.log("desde concept3", selectedFiles);
    };
    const handleUpload = async () => {
        // Crear un objeto FormData
        const formData = new FormData();
        const formData2 = new FormData();
        let data;
        if (tipoInformacion) {
            data = 1;
            formData.append("pregunta", textareaValue);
            formData.append("idSection", data);
            selectedFiles.forEach((file, index) => {
                formData.append("imagenes", file); // Usar el mismo nombre de campo para todas las imágenes
                formData.append("imagenIndex", index + 1); // Agregar información sobre el índice
                formData.append("respuestaCorrecta", correctAnswers[index] ? 1 : 0); // Agregar la respuesta correcta
                formData.append("fila", 0);
            })
        } else if (tipoSemejanza) {
            data = 2;
            /* Llenar el array de esMuestra con las opciones de respuesta */
            selectedFiles.forEach(() => {
                esMuestra.push(0);
            });
            /* Llenar el array de esMuestra con las muestras*/
            imagenesMuestra.forEach(() => {
                esMuestra.push(1);
            });
            imagenesMuestra.forEach((file) => {
                selectedFiles.push(file);
            });

            formData.append("pregunta", textareaValue);
            formData.append("idSection", data);
            selectedFiles.forEach((file, index) => {
                formData.append("imagenes", file); // Usar el mismo nombre de campo para todas las imágenes
                formData.append("imagenIndex", index + 1); // Agregar información sobre el índice
                formData.append("respuestaCorrecta", correctAnswers[index] ? 1 : 0); // Agregar la respuesta correcta
                formData.append("fila", 0);
                formData.append("esMuestra", esMuestra[index] ? 1 : 0);
            });
            console.log("desde semejanza", selectedFiles);
        } else if (tipoVocabulario) {
            data = 3;
        } else if (tipoComprension) {
            data = 4;
        } else if (tipoDibujos) {
            data = 5;
        } else if (tipoNombres) {
            data = 6;
        } else if (tipoMatrices) {
            data = 7;
        } else if (tipoConceptos) {
            data = 8;
            formData.append("pregunta", textareaValue);
            formData.append("idSection", data);
            selectedFiles.forEach((file, index) => {
                formData.append("imagenes", file); // Usar el mismo nombre de campo para todas las imágenes
                formData.append("imagenIndex", index + 1); // Agregar información sobre el índice
                formData.append("respuestaCorrecta", correctAnswers[index] ? 1 : 0); // Agregar la respuesta correcta
                formData.append("fila", 0);
            });
        } else if (tipoReconocimiento) {
            data = 9;
        } else if (tipoBusqueda) {
            data = 10;
        }
        try {
            // Enviar la solicitud al servidor
            const response = await axios.post(
                "http://localhost:3001/uploadQuestion",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            // Manejar la respuesta del servidor
            console.log(response.data);
            if (response.data.message === 'Pregunta creada correctamente') {
                // Si la pregunta se crea, muestra un mensaje de confirmacion
                setSuccessMessage(true);
                // El mensaje desaparece luego de 3 segundos
                setTimeout(() => {
                    setSuccessMessage(false);
                    router.push('/select/selectSeccionPregunta');
                }, 3000);
                clearFields();
            } else if (response.data.message === 'Esta pregunta ya se encuentra registrada') {
                // Si la pregunta ya existe, muestra un mensaje de advertencia
                setWarningMessage(true);
                // El mensaje desaparece luego de 3 segundos
                setTimeout(() => {
                    setWarningMessage(false);
                }, 3000);
                setTextareaValue('');
            }
        } catch (error) {
            console.error("Error al subir la pregunta:", error);
        }
    };
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar redirectionPath={`/`}
                      color={navstyles.upper_bar_red} questionType={dato}/>
            <InstructionBar previousPage={`../select/selectSeccionPregunta`}
                            instruction={`Crea una pregunta`}/>
            {tipoInformacion && (
                <div className={`container-fluid px-5`}>
                    <h5><label htmlFor="myTextarea">Pregunta</label></h5>
                    <textarea
                        id="myTextarea"
                        name="myTextarea"
                        value={textareaValue}
                        onChange={handleChange}
                        rows="4" // Puedes ajustar la cantidad de filas según tus necesidades
                        className={`w-100 border-1 border-black shadow-md rounded-2xl p-3`}
                    />
                    <br/> <br/>
                    <h5><label>Respuestas</label></h5>
                    <div className={`border-1 border-black shadow-md rounded-2xl px-5 pt-4 bg-white`}>
                        {selectedFiles.map((file, index) => (
                            <div key={index}>
                                <div className={`container-fluid `}>
                                    <div className={`row mx-5 d-flex py-2 px-2 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}`}>
                                        <div className={`col-1 d-flex justify-content-end`}>
                                            <input
                                                type="checkbox"
                                                name={`respuestaCorrecta_${index}`}
                                                checked={correctAnswers[index] || false}
                                                onChange={(e) => {
                                                    const isChecked = e.target.checked;
                                                    setCorrectAnswers((prevRespuestas) => ({
                                                        ...prevRespuestas,
                                                        [index]: isChecked,
                                                    }));
                                                }}
                                                className={`w-4/12`}
                                            />
                                        </div>
                                        <div className={`col-5`}>
                                            <div className={`py-3`}>
                                                {file.name} (opcion {index + 1})
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                            </div>
                        ))}
                        <label htmlFor="myAnswersArea" className="custom-file-upload d-flex justify-center">
                            <div className={`px-4 py-2 text-white rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${navstyles.upper_bar_red} ${styles.btn_text}`}>
                                +
                            </div>
                        </label>
                        <input
                            type="file"
                            id="myAnswersArea"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{display: 'none'}} // Ocultar el input original
                            multiple
                        />
                        <br/>
                        <div className={`container-fluid`}>
                            <div className={`row justify-content-evenly`}>
                                <div className={`col-5 d-flex justify-content-center`}>
                                    <button onClick={handleUpload}
                                            className={`px-5 py-2 text-black rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${navstyles.upper_bar_red} ${styles.btn_text}`}>
                                        Crear Pregunta
                                    </button>
                                </div>
                                <div className={`col-5 d-flex justify-content-center`}>
                                    <button onClick={() => setSelectedFiles([])}
                                            className={`px-5 py-2 text-black rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${navstyles.upper_bar_red} ${styles.btn_text}`}>
                                        Limpiar imágenes
                                    </button>
                                </div>
                            </div>
                        </div>
                        <br/>
                    </div>
                </div>
            )}
            {tipoSemejanza && (
                <div className={`container-fluid px-5`}>
                    <h5><label htmlFor="myTextarea">Pregunta</label></h5>
                    <textarea
                        id="myTextarea"
                        name="myTextarea"
                        value={textareaValue}
                        onChange={handleChange}
                        rows="3" // Puedes ajustar la cantidad de filas según tus necesidades
                        className={`w-100 border-1 border-black shadow-md rounded-2xl p-3`}
                    />
                    <br/> <br/>
                    <div className={`row`}>
                        <div className={`col-6`}>
                            <h5><label>Imágenes de Muestra</label></h5>
                            <div className={`border-1 border-black shadow-md rounded-2xl px-5 pt-4 bg-white`}>
                                {imagenesMuestra.map((file, index) => (
                                    <div key={index}>
                                        <div className={`container-fluid `}>
                                            <div className={`row mx-5 d-flex py-2 px-2 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}`}>
                                                <div className={`col-5`}>
                                                    <div className={`py-3`}>
                                                        {file.name}
                                                        <div className={`font-bold`}>
                                                            (muestra {index + 1})
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br/>
                                    </div>
                                ))}
                                <label htmlFor="myMuestraArea" className="custom-file-upload d-flex justify-center">
                                    <div className={`px-4 py-2 text-white rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${navstyles.upper_bar_red} ${styles.btn_text}`}>
                                        +
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    id="myMuestraArea"
                                    accept="image/*"
                                    onChange={handleFileChangeMuestra}
                                    style={{display: 'none'}} // Ocultar el input original
                                    multiple
                                />
                                <br/>
                                <div className={`container-fluid`}>
                                    <div className={`row justify-content-evenly`}>
                                        <div className={`col-12 d-flex justify-content-center`}>
                                            <button onClick={() => setImagenesMuestra([])}
                                                    className={`px-5 py-2 text-black rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${navstyles.upper_bar_red} ${styles.btn_text}`}>
                                                Limpiar imágenes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                            </div>
                        </div>
                        <div className={`col-6`}>
                            <h5><label>Opciones de Repsuesta</label></h5>
                            <div className={`border-1 border-black shadow-md rounded-2xl px-5 pt-4 bg-white`}>
                                {selectedFiles.map((file, index) => (
                                    <div key={index}>
                                        <div className={`container-fluid `}>
                                            <div className={`row mx-5 d-flex py-2 px-2 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}`}>
                                                <div className={`col-2 d-flex justify-content-end`}>
                                                    <input
                                                        type="checkbox"
                                                        name={`respuestaCorrecta_${index}`}
                                                        checked={correctAnswers[index] || false}
                                                        onChange={(e) => {
                                                            const isChecked = e.target.checked;
                                                            setCorrectAnswers((prevRespuestas) => ({
                                                                ...prevRespuestas,
                                                                [index]: isChecked,
                                                            }));
                                                        }}
                                                        className={`w-4/12`}
                                                    />
                                                </div>
                                                <div className={`col-5`}>
                                                    <div className={`py-3`}>
                                                        <div>{file.name}</div>
                                                        <div className={`font-bold`}>(opcion {index + 1})</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br/>
                                    </div>
                                ))}
                                <label htmlFor="myAnswersArea" className="custom-file-upload d-flex justify-center">
                                    <div className={`px-4 py-2 text-white rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${navstyles.upper_bar_red} ${styles.btn_text}`}>
                                        +
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    id="myAnswersArea"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{display: 'none'}} // Ocultar el input original
                                    multiple
                                />
                                <br/>
                                <div className={`container-fluid`}>
                                    <div className={`row justify-content-evenly`}>
                                        <div className={`col-12 d-flex justify-content-center`}>
                                            <button onClick={() => setSelectedFiles([])}
                                                    className={`px-5 py-2 text-black rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${navstyles.upper_bar_red} ${styles.btn_text}`}>
                                                Limpiar imágenes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                            </div>
                            <br/>
                        </div>
                        <div className={`d-flex justify-content-center`}>
                            <button onClick={handleUpload}
                                    className={`px-5 py-2 text-black rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${navstyles.upper_bar_red} ${styles.btn_text}`}>
                                Crear Pregunta
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {tipoVocabulario && (
                <div className={`container-fluid`}>
                    <br/>
                    <h4><label htmlFor="myTextarea">Pregunta</label></h4>
                    <textarea
                        id="myTextarea"
                        name="myTextarea"
                        value={textareaValue}
                        onChange={handleChange}
                        rows="4" // Puedes ajustar la cantidad de filas según tus necesidades
                        className={`w-100 border-1 border-black shadow-md rounded-2xl p-3`}
                    />
                    <h4><label htmlFor="myAnswersArea">Imagen de muestra</label></h4>
                    <div className={`border-1 border-black shadow-md rounded-2xl p-3 bg-white`}>
                        {selectedFiles.map((file, index) => (
                            <div key={index}>
                                <div className={`container-fluid`}>
                                    <div className={`row`}>
                                        <div className={`col-1 d-flex justify-content-end`}>
                                            <input
                                                type="checkbox"
                                                name={`respuestaCorrecta_${index}`}
                                                checked={correctAnswers[index] || false}
                                                onChange={(e) => {
                                                    const isChecked = e.target.checked;
                                                    setCorrectAnswers((prevRespuestas) => ({
                                                        ...prevRespuestas,
                                                        [index]: isChecked,
                                                    }));
                                                }}
                                            />
                                        </div>
                                        <div className={`col-5`}>
                                            <p>{file.name} (opcion {index + 1})</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <label htmlFor="myAnswersArea" className="custom-file-upload d-flex justify-center">
                            <div className="btn btn-danger">+</div>
                        </label>
                        <input
                            type="file"
                            id="myAnswersArea"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{display: 'none'}} // Ocultar el input original
                            multiple
                        />
                        <br/>
                        <div className={`container-fluid`}>
                            <div className={`row justify-content-evenly`}>
                                <div className={`col-5 d-flex justify-content-center`}>
                                    <button className={`btn btn-dark`} onClick={handleUpload}>
                                        Subir imágenes
                                    </button>
                                </div>
                                <div className={`col-5 d-flex justify-content-center`}>
                                    <button className={`btn btn-secondary`} onClick={() => setSelectedFiles([])}>
                                        Limpiar imágenes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {tipoComprension && (
                <div className={`container-fluid`}>
                    <br/>
                    <h4><label htmlFor="myTextarea">Pregunta</label></h4>
                    <textarea
                        id="myTextarea"
                        name="myTextarea"
                        value={textareaValue}
                        onChange={handleChange}
                        rows="4" // Puedes ajustar la cantidad de filas según tus necesidades
                        className={`w-100 border-1 border-black shadow-md rounded-2xl p-3`}
                    />
                    <h4><label>Respuestas</label></h4>
                    <div className={`border-1 border-black shadow-md rounded-2xl p-3 bg-white`}>
                        {selectedFiles.map((file, index) => (
                            <div key={index}>
                                <div className={`container-fluid`}>
                                    <div className={`row`}>
                                        <div className={`col-1 d-flex justify-content-end`}>
                                            <input
                                                type="checkbox"
                                                name={`respuestaCorrecta_${index}`}
                                                checked={correctAnswers[index] || false}
                                                onChange={(e) => {
                                                    const isChecked = e.target.checked;
                                                    setCorrectAnswers((prevRespuestas) => ({
                                                        ...prevRespuestas,
                                                        [index]: isChecked,
                                                    }));
                                                }}
                                            />
                                        </div>
                                        <div className={`col-5`}>
                                            <p>{file.name} (opcion {index + 1})</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <label htmlFor="myAnswersArea" className="custom-file-upload d-flex justify-center">
                            <div className="btn btn-danger">+</div>
                        </label>
                        <input
                            type="file"
                            id="myAnswersArea"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{display: 'none'}} // Ocultar el input original
                            multiple
                        />
                        <br/>
                        <div className={`container-fluid`}>
                            <div className={`row justify-content-evenly`}>
                                <div className={`col-5 d-flex justify-content-center`}>
                                    <button className={`btn btn-dark`} onClick={handleUpload}>
                                        Subir imágenes
                                    </button>
                                </div>
                                <div className={`col-5 d-flex justify-content-center`}>
                                    <button className={`btn btn-secondary`} onClick={() => setSelectedFiles([])}>
                                        Limpiar imágenes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {tipoDibujos && (
                <div className={`container-fluid`}>
                    <br/>
                    <h4><label htmlFor="myTextarea">Pregunta</label></h4>
                    <textarea
                        id="myTextarea"
                        name="myTextarea"
                        value={textareaValue}
                        onChange={handleChange}
                        rows="4" // Puedes ajustar la cantidad de filas según tus necesidades
                        className={`w-100 border-1 border-black shadow-md rounded-2xl p-3`}
                    />
                    <h4><label>Respuestas</label></h4>
                    <div className={`border-1 border-black shadow-md rounded-2xl p-3 bg-white`}>
                        {selectedFiles.map((file, index) => (
                            <div key={index}>
                                <div className={`container-fluid`}>
                                    <div className={`row`}>
                                        <div className={`col-1 d-flex justify-content-end`}>
                                            <input
                                                type="checkbox"
                                                name={`respuestaCorrecta_${index}`}
                                                checked={correctAnswers[index] || false}
                                                onChange={(e) => {
                                                    const isChecked = e.target.checked;
                                                    setCorrectAnswers((prevRespuestas) => ({
                                                        ...prevRespuestas,
                                                        [index]: isChecked,
                                                    }));
                                                }}
                                            />
                                        </div>
                                        <div className={`col-5`}>
                                            <p>{file.name} (opcion {index + 1})</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <label htmlFor="myAnswersArea" className="custom-file-upload d-flex justify-center">
                            <div className="btn btn-danger">+</div>
                        </label>
                        <input
                            type="file"
                            id="myAnswersArea"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{display: 'none'}} // Ocultar el input original
                            multiple
                        />
                        <br/>
                        <div className={`container-fluid`}>
                            <div className={`row justify-content-evenly`}>
                                <div className={`col-5 d-flex justify-content-center`}>
                                    <button className={`btn btn-dark`} onClick={handleUpload}>
                                        Subir imágenes
                                    </button>
                                </div>
                                <div className={`col-5 d-flex justify-content-center`}>
                                    <button className={`btn btn-secondary`} onClick={() => setSelectedFiles([])}>
                                        Limpiar imágenes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {tipoNombres && (
                <div className={`container-fluid`}>
                    <br/>
                    <h4><label htmlFor="myTextarea">Pregunta</label></h4>
                    <textarea
                        id="myTextarea"
                        name="myTextarea"
                        value={textareaValue}
                        onChange={handleChange}
                        rows="4" // Puedes ajustar la cantidad de filas según tus necesidades
                        className={`w-100 border-1 border-black shadow-md rounded-2xl p-3`}
                    />
                    <h4><label htmlFor="myAnswersArea">Imagen de muestra</label></h4>
                    <div className={`border-1 border-black shadow-md rounded-2xl p-3 bg-white`}>
                        {selectedFiles.map((file, index) => (
                            <div key={index}>
                                <div className={`container-fluid`}>
                                    <div className={`row`}>
                                        <div className={`col-1 d-flex justify-content-end`}>
                                            <input
                                                type="checkbox"
                                                name={`respuestaCorrecta_${index}`}
                                                checked={correctAnswers[index] || false}
                                                onChange={(e) => {
                                                    const isChecked = e.target.checked;
                                                    setCorrectAnswers((prevRespuestas) => ({
                                                        ...prevRespuestas,
                                                        [index]: isChecked,
                                                    }));
                                                }}
                                            />
                                        </div>
                                        <div className={`col-5`}>
                                            <p>{file.name} (opcion {index + 1})</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <label htmlFor="myAnswersArea" className="custom-file-upload d-flex justify-center">
                            <div className="btn btn-danger">+</div>
                        </label>
                        <input
                            type="file"
                            id="myAnswersArea"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{display: 'none'}} // Ocultar el input original
                            multiple
                        />
                        <br/>
                        <div className={`container-fluid`}>
                            <div className={`row justify-content-evenly`}>
                                <div className={`col-5 d-flex justify-content-center`}>
                                    <button className={`btn btn-dark`} onClick={handleUpload}>
                                        Subir imágenes
                                    </button>
                                </div>
                                <div className={`col-5 d-flex justify-content-center`}>
                                    <button className={`btn btn-secondary`} onClick={() => setSelectedFiles([])}>
                                        Limpiar imágenes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {tipoMatrices && (
                <div>
                    CREAR UNA PREGUNTA DE MATRICES
                </div>
            )}
            {tipoConceptos && (
                <div className={`container-fluid`}>
                    <br/>
                    <h4><label htmlFor="myTextarea">Pregunta</label></h4>
                    <textarea
                        id="myTextarea"
                        name="myTextarea"
                        value={textareaValue}
                        onChange={handleChange}
                        rows="4" // Puedes ajustar la cantidad de filas según tus necesidades
                        className={`w-100 border-1 border-black shadow-md rounded-2xl p-3`}
                    />
                    <h4><label>Imágenes de muestra</label></h4>
                    <div className={`border-1 border-black shadow-md rounded-2xl p-3 bg-white`}>
                        <h4>Fila 1</h4>
                        <label htmlFor="myAnswersArea" className="custom-file-upload d-flex justify-center">
                            <div className="btn btn-danger">+</div>
                        </label>
                        <input
                            type="file"
                            id="myAnswersArea"
                            accept="image/*"
                            onChange={handleFileChangeConcept1}
                            style={{display: 'none'}} // Ocultar el input original
                            multiple
                        />
                        {selectedFiles1.map((file, index) => (
                            <div key={index}>
                                <div className={`container-fluid`}>
                                    <div className={`row`}>
                                        <div className={`col-1 d-flex justify-content-end`}>
                                            <input
                                                type="checkbox"
                                                name={`respuestaCorrecta_${index}`}
                                                checked={correctAnswers[index] || false}
                                                onChange={(e) => {
                                                    const isChecked = e.target.checked;
                                                    setCorrectAnswers((prevRespuestas) => ({
                                                        ...prevRespuestas,
                                                        [index]: isChecked,
                                                    }));
                                                }}
                                            />
                                        </div>
                                        <div className={`col-5`}>
                                            <p>{file.name} (opcion {index + 1})</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <h4>Fila 2</h4>
                        <label htmlFor="myAnswersArea2" className="custom-file-upload d-flex justify-center">
                            <div className="btn btn-danger">+</div>
                        </label>
                        <input
                            type="file"
                            id="myAnswersArea2"
                            accept="image/*"
                            onChange={handleFileChangeConcept2}
                            style={{display: 'none'}} // Ocultar el input original
                            multiple
                        />
                        {selectedFiles2.map((file2, index2) => (
                            <div key={index2}>
                                <div className={`container-fluid`}>
                                    <div className={`row`}>
                                        <div className={`col-1 d-flex justify-content-end`}>
                                            <input
                                                type="checkbox"
                                                name={`respuestaCorrecta_${index2}`}
                                                checked={correctAnswers[index2] || false}
                                                onChange={(e) => {
                                                    const isChecked = e.target.checked;
                                                    setCorrectAnswers((prevRespuestas) => ({
                                                        ...prevRespuestas,
                                                        [index2]: isChecked,
                                                    }));
                                                }}
                                            />
                                        </div>
                                        <div className={`col-5`}>
                                            <p>{file2.name} (opcion {index2 + 1})</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <h4>Fila 3</h4>
                        <label htmlFor="myAnswersArea3" className="custom-file-upload d-flex justify-center">
                            <div className="btn btn-danger">+</div>
                        </label>
                        <input
                            type="file"
                            id="myAnswersArea3"
                            accept="image/*"
                            onChange={handleFileChangeConcept3}
                            style={{display: 'none'}} // Ocultar el input original
                            multiple
                        />
                        {selectedFiles3.map((file3, index3) => (
                            <div key={index3}>
                                <div className={`container-fluid`}>
                                    <div className={`row`}>
                                        <div className={`col-1 d-flex justify-content-end`}>
                                            <input
                                                type="checkbox"
                                                name={`respuestaCorrecta_${index3}`}
                                                checked={correctAnswers[index3] || false}
                                                onChange={(e) => {
                                                    const isChecked = e.target.checked;
                                                    setCorrectAnswers((prevRespuestas) => ({
                                                        ...prevRespuestas,
                                                        [index3]: isChecked,
                                                    }));
                                                }}
                                            />
                                        </div>
                                        <div className={`col-5`}>
                                            <p>{file3.name} (opcion {index3 + 1})</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <br/>
                        <div className={`container-fluid`}>
                            <div className={`row justify-content-evenly`}>
                                <div className={`col-12 d-flex justify-content-center`}>
                                    <div className={`col-5 d-flex justify-content-center`}>
                                        <button className={`btn btn-dark`} onClick={handleUpload}>
                                            Subir imágenes
                                        </button>
                                    </div>
                                    <button className={`btn btn-secondary`} onClick={() => setSelectedFiles([])}>
                                        Limpiar imágenes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                </div>
            )}
            {tipoReconocimiento && (
                <div>
                    CREAR UNA PREGUNTA DE RECONOCIMIENTO
                </div>
            )}
            {tipoBusqueda && (
                <div>
                    CREAR UNA PREGUNTA DE BÚSQUEDA
                </div>
            )}
            {successMessage && (
                <div>
                    <br/>
                    <div className="alert alert-success d-flex justify-content-center" role="alert">
                        ¡Pregunta Creada Correctamente!
                    </div>
                </div>
            )}
            {warningMessage && (
                <div>
                    <br/>
                    <div className="alert alert-warning d-flex justify-content-center" role="alert">
                        ¡Esta pregunta ya se encuentra registrada!
                    </div>
                </div>
            )}
            <br/>
        </main>
    )
}