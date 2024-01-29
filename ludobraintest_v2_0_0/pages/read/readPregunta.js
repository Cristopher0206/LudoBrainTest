import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import navstyles from '../../styles/navstyles.module.css'
import AddButton from "@/components/AddButton";
import styles from "@/styles/styles.module.css";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";

export default function ReadPregunta() {
    const router = useRouter();
    let section;
    /*------------------- ESTADOS -------------------*/
    const [sectionSelected, setSectionSelected] = useState('');
    const [sections, setSections] = useState([]);
    // Estados para los mensajes de confirmación
    const [successMessage, setSuccessMessage] = useState(false);
    // Estados para las preguntas
    const [informationQuestions, setInformationQuestions] = useState([]); // Estado para las preguntas de tipo Información
    const [semejanzasQuestions, setSemejanzasQuestions] = useState([]); // Estado para las preguntas de tipo Semejanzas
    const [vocabularioQuestions, setVocabularioQuestions] = useState([]); // Estado para las preguntas de tipo Vocabulario
    const [comprensionQuestions, setComprensionQuestions] = useState([]); // Estado para las preguntas de tipo Comprensión
    const [dibujosQuestions, setDibujosQuestions] = useState([]); // Estado para las preguntas de tipo Dibujos
    const [nombresQuestions, setNombresQuestions] = useState([]); // Estado para las preguntas de tipo Nombres
    const [matricesQuestions, setMatricesQuestions] = useState([]); // Estado para las preguntas de tipo Matrices
    const [conceptosQuestions, setConceptosQuestions] = useState([]); // Estado para las preguntas de tipo Conceptos
    const [reconocimientoQuestions, setReconocimientoQuestions] = useState([]); // Estado para las preguntas de tipo Reconocimiento
    const [busquedaQuestions, setBusquedaQuestions] = useState([]); // Estado para las preguntas de tipo Búsqueda
    // Estados para generar los títulos
    const [informationTitle, setInformationTitle] = useState(false);
    const [semejanzasTitle, setSemejanzasTitle] = useState(false);
    const [vocabularioTitle, setVocabularioTitle] = useState(false);
    const [comprensionTitle, setComprensionTitle] = useState(false);
    const [dibujosTitle, setDibujosTitle] = useState(false);
    const [nombresTitle, setNombresTitle] = useState(false);
    const [matricesTitle, setMatricesTitle] = useState(false);
    const [conceptosTitle, setConceptosTitle] = useState(false);
    const [reconocimientoTitle, setReconocimientoTitle] = useState(false);
    const [busquedaTitle, setBusquedaTitle] = useState(false);
    /*------------------- EFECTOS -------------------*/
    useEffect(() => { // useEffect para obtener el usuario de la sesión
        getSections();
    }, []);
    /*------------------- FUNCIONES -------------------*/
    const getInformacionQuestions = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/getInformacionQuestions",
        }).then((res) => {
            if (res.data) {
                setInformationQuestions(res.data);
                if (res.data.length !== 0) {
                    setInformationTitle(true);
                }
            } else {
                console.error("No existe información", res);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getSemejanzasQuestions = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/getSemejanzasQuestions",
        }).then((res) => {
            if (res.data) {
                setSemejanzasQuestions(res.data);
                if (res.data.length !== 0) {
                    setSemejanzasTitle(true);
                }
            } else {
                console.error("No existe información", res);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getVocabularioQuestions = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/getVocabularioQuestions",
        }).then((res) => {
            if (res.data) {
                setVocabularioQuestions(res.data);
                if (res.data.length !== 0) {
                    setVocabularioTitle(true);
                }
            } else {
                console.error("No existe información", res);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getComprensionQuestions = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/getComprensionQuestions",
        }).then((res) => {
            if (res.data) {
                setComprensionQuestions(res.data);
                if (res.data.length !== 0) {
                    setComprensionTitle(true);
                }
            } else {
                console.error("No existe información", res);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getDibujosQuestions = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/getDibujosQuestions",
        }).then((res) => {
            if (res.data) {
                setDibujosQuestions(res.data);
                if (res.data.length !== 0) {
                    setDibujosTitle(true);
                }
            } else {
                console.error("No existe información", res);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getNombresQuestions = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/getNombresQuestions",
        }).then((res) => {
            if (res.data) {
                setNombresQuestions(res.data);
                if (res.data.length !== 0) {
                    setNombresTitle(true);
                }
            } else {
                console.error("No existe información", res);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getMatricesQuestions = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/getMatricesQuestions",
        }).then((res) => {
            if (res.data) {
                setMatricesQuestions(res.data);
                if (res.data.length !== 0) {
                    setMatricesTitle(true);
                }
            } else {
                console.error("No existe información", res);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getConceptosQuestions = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/getConceptosQuestions",
        }).then((res) => {
            if (res.data) {
                setConceptosQuestions(res.data);
                if (res.data.length !== 0) {
                    setConceptosTitle(true);
                }
            } else {
                console.error("No existe información", res);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getReconocimientoQuestions = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/getReconocimientoQuestions",
        }).then((res) => {
            if (res.data) {
                setReconocimientoQuestions(res.data);
                if (res.data.length !== 0) {
                    setReconocimientoTitle(true);
                }
            } else {
                console.error("No existe información", res);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getBusquedaQuestions = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/getBusquedaQuestions",
        }).then((res) => {
            if (res.data) {
                setBusquedaQuestions(res.data);
                if (res.data.length !== 0) {
                    setBusquedaTitle(true);
                }
            } else {
                console.error("No existe información", res);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getSections = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/getSections"
        }).then((res) => {
            setSections(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }
    const showTests = () => {
        switch (section) {
            case "Información":
                getInformacionQuestions();
                setSemejanzasTitle(false);
                setVocabularioTitle(false);
                setComprensionTitle(false);
                setDibujosTitle(false);
                setNombresTitle(false);
                setMatricesTitle(false);
                setConceptosTitle(false);
                setReconocimientoTitle(false);
                setBusquedaTitle(false);
                break;
            case "Semejanzas":
                getSemejanzasQuestions();
                setInformationTitle(false);
                setVocabularioTitle(false);
                setComprensionTitle(false);
                setDibujosTitle(false);
                setNombresTitle(false);
                setMatricesTitle(false);
                setConceptosTitle(false);
                setReconocimientoTitle(false);
                setBusquedaTitle(false);
                break;
            case "Vocabulario":
                getVocabularioQuestions();
                setInformationTitle(false);
                setSemejanzasTitle(false);
                setComprensionTitle(false);
                setDibujosTitle(false);
                setNombresTitle(false);
                setMatricesTitle(false);
                setConceptosTitle(false);
                setReconocimientoTitle(false);
                setBusquedaTitle(false);
                break;
            case "Comprensión":
                getComprensionQuestions();
                setInformationTitle(false);
                setSemejanzasTitle(false);
                setVocabularioTitle(false);
                setDibujosTitle(false);
                setNombresTitle(false);
                setMatricesTitle(false);
                setConceptosTitle(false);
                setReconocimientoTitle(false);
                setBusquedaTitle(false);
                break;
            case "Dibujos":
                getDibujosQuestions();
                setInformationTitle(false);
                setSemejanzasTitle(false);
                setVocabularioTitle(false);
                setComprensionTitle(false);
                setNombresTitle(false);
                setMatricesTitle(false);
                setConceptosTitle(false);
                setReconocimientoTitle(false);
                setBusquedaTitle(false);
                break;
            case "Nombres":
                getNombresQuestions();
                setInformationTitle(false);
                setSemejanzasTitle(false);
                setVocabularioTitle(false);
                setComprensionTitle(false);
                setDibujosTitle(false);
                setMatricesTitle(false);
                setConceptosTitle(false);
                setReconocimientoTitle(false);
                setBusquedaTitle(false);
                break;
            case "Matrices":
                getMatricesQuestions();
                setInformationTitle(false);
                setSemejanzasTitle(false);
                setVocabularioTitle(false);
                setComprensionTitle(false);
                setDibujosTitle(false);
                setNombresTitle(false);
                setConceptosTitle(false);
                setReconocimientoTitle(false);
                setBusquedaTitle(false);
                break;
            case "Conceptos":
                getConceptosQuestions();
                setInformationTitle(false);
                setSemejanzasTitle(false);
                setVocabularioTitle(false);
                setComprensionTitle(false);
                setDibujosTitle(false);
                setNombresTitle(false);
                setMatricesTitle(false);
                setReconocimientoTitle(false);
                setBusquedaTitle(false);
                break;
            case "Reconocimiento":
                getReconocimientoQuestions();
                setInformationTitle(false);
                setSemejanzasTitle(false);
                setVocabularioTitle(false);
                setComprensionTitle(false);
                setDibujosTitle(false);
                setNombresTitle(false);
                setMatricesTitle(false);
                setConceptosTitle(false);
                setBusquedaTitle(false);
                break;
            case "Búsqueda":
                getBusquedaQuestions();
                setInformationTitle(false);
                setSemejanzasTitle(false);
                setVocabularioTitle(false);
                setComprensionTitle(false);
                setDibujosTitle(false);
                setNombresTitle(false);
                setMatricesTitle(false);
                setConceptosTitle(false);
                setReconocimientoTitle(false);
                break;
            default:
                break;

        }
    }
    const eliminarPregunta = (id_pregunta) => {
        const confirmacion = window.confirm("¿Estás seguro de eliminar esta pregunta?");
        if (confirmacion) {
            axios({
                method: "post",
                data: {
                    id_pregunta: id_pregunta
                },
                withCredentials: true,
                url: "http://localhost:3001/deleteQuestion",
            }).then((res) => {
                console.log(res);
                if (res.data.message === 'Pregunta eliminada exitosamente') {
                    // Si el test se elimina, muestra un mensaje de confirmacion
                    setSuccessMessage(true);
                    // El mensaje desaparece luego de 3 segundos
                    setTimeout(() => {
                        setSuccessMessage(false);
                        showTests();
                    }, 3000);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar redirectionPath={`/`}
                      color={navstyles.upper_bar_red}></UpperBar>
            <InstructionBar previousPage={`/modulosCreacion`}
                            instruction={`Crea una nueva pregunta`}/>
            <AddButton createPage={`../select/selectSeccionPregunta`}
                       color={navstyles.upper_bar_red}/>
            <br/>
            <div className={`container-fluid`}>
                <div className={`row`}>
                    <div className={`col-6`}>
                        <div className={`flex justify-center border-1 border-black shadow-md rounded-2xl bg-white h-100`}>
                            <select value={sectionSelected}
                                    onChange={e => {
                                        setSectionSelected(e.target.value);
                                        section = e.target.value;
                                        showTests();
                                    }}
                                    className={`border-2 border-black border-opacity-50 rounded-full font-bold w-75 px-4 py-2 shadow-md
                                    ${styles.input_red} mt-4 h-min  text-white`}>
                                <option value="">Selecciona una sección</option>
                                {sections.map((section, index) => (
                                    <option key={index}
                                            value={section.nombre_seccion}>
                                        {section.nombre_seccion}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={`col-6`}>
                        <div className={`border-1 border-black shadow-md rounded-2xl bg-white
                        ${styles.overflow_container_questions} p-0`}>
                            <br/>
                            {informationTitle &&
                                <div className={`col-12 px-2`}>
                                    {informationQuestions.map((question, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_red}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div className={`col-sm-4 col-md-6 col-lg-6`}>
                                                                    <div className={`font-medium card-title pt-1 ${styles.card_test_text}`}>
                                                                        {question.pregunta}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-3 d-md-flex d-lg-flex justify-content-between pt-sm-3 pt-md-0 pt-lg-0`}>
                                                                    <button onClick={() => eliminarPregunta(question.id_pregunta)}>
                                                                        <img src="/images/eliminar.png" alt="trashIcon"
                                                                             className={`${styles.manage_icon}`}/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                            {semejanzasTitle &&
                                <div className={`col-12 px-2`}>
                                    {semejanzasQuestions.map((question, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_red}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div className={`col-sm-4 col-md-6 col-lg-6`}>
                                                                    <div className={`font-medium card-title pt-1 ${styles.card_test_text}`}>
                                                                        {question.pregunta}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-3 d-md-flex d-lg-flex justify-content-between pt-sm-3 pt-md-0 pt-lg-0`}>
                                                                    <button onClick={() => eliminarPregunta(question.id_pregunta)}>
                                                                        <img src="/images/eliminar.png" alt="trashIcon"
                                                                             className={`${styles.manage_icon}`}/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                            {vocabularioTitle &&
                                <div className={`col-12 px-2`}>
                                    {vocabularioQuestions.map((question, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_red}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div className={`col-sm-4 col-md-6 col-lg-6`}>
                                                                    <div className={`font-medium card-title pt-1 ${styles.card_test_text}`}>
                                                                        {question.pregunta}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-3 d-md-flex d-lg-flex justify-content-between pt-sm-3 pt-md-0 pt-lg-0`}>
                                                                    <button onClick={() => eliminarPregunta(question.id_pregunta)}>
                                                                        <img src="/images/eliminar.png" alt="trashIcon"
                                                                             className={`${styles.manage_icon}`}/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                            {comprensionTitle &&
                                <div className={`col-12 px-2`}>
                                    {comprensionQuestions.map((question, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_red}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div className={`col-sm-4 col-md-6 col-lg-6`}>
                                                                    <div className={`font-medium card-title pt-1 ${styles.card_test_text}`}>
                                                                        {question.pregunta}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-3 d-md-flex d-lg-flex justify-content-between pt-sm-3 pt-md-0 pt-lg-0`}>
                                                                    <button onClick={() => eliminarPregunta(question.id_pregunta)}>
                                                                        <img src="/images/eliminar.png" alt="trashIcon"
                                                                             className={`${styles.manage_icon}`}/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                            {dibujosTitle &&
                                <div className={`col-12 px-2`}>
                                    {dibujosQuestions.map((question, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_red}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div className={`col-sm-4 col-md-6 col-lg-6`}>
                                                                    <div className={`font-medium card-title pt-1 ${styles.card_test_text}`}>
                                                                        {question.pregunta}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-3 d-md-flex d-lg-flex justify-content-between pt-sm-3 pt-md-0 pt-lg-0`}>
                                                                    <button onClick={() => eliminarPregunta(question.id_pregunta)}>
                                                                        <img src="/images/eliminar.png" alt="trashIcon"
                                                                             className={`${styles.manage_icon}`}/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                            {nombresTitle &&
                                <div className={`col-12 px-2`}>
                                    {nombresQuestions.map((question, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_red}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div className={`col-sm-4 col-md-6 col-lg-6`}>
                                                                    <div className={`font-medium card-title pt-1 ${styles.card_test_text}`}>
                                                                        {question.pregunta}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-3 d-md-flex d-lg-flex justify-content-between pt-sm-3 pt-md-0 pt-lg-0`}>
                                                                    <button onClick={() => eliminarPregunta(question.id_pregunta)}>
                                                                        <img src="/images/eliminar.png" alt="trashIcon"
                                                                             className={`${styles.manage_icon}`}/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                            {matricesTitle &&
                                <div className={`col-12 px-2`}>
                                    {matricesQuestions.map((question, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_red}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div className={`col-sm-4 col-md-6 col-lg-6`}>
                                                                    <div className={`font-medium card-title pt-1 ${styles.card_test_text}`}>
                                                                        {question.pregunta}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-3 d-md-flex d-lg-flex justify-content-between pt-sm-3 pt-md-0 pt-lg-0`}>
                                                                    <button onClick={() => eliminarPregunta(question.id_pregunta)}>
                                                                        <img src="/images/eliminar.png" alt="trashIcon"
                                                                             className={`${styles.manage_icon}`}/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                            {conceptosTitle &&
                                <div className={`col-12 px-2`}>
                                    {conceptosQuestions.map((question, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_red}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div className={`col-sm-4 col-md-6 col-lg-6`}>
                                                                    <div className={`font-medium card-title pt-1 ${styles.card_test_text}`}>
                                                                        {question.pregunta}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-3 d-md-flex d-lg-flex justify-content-between pt-sm-3 pt-md-0 pt-lg-0`}>
                                                                    <button onClick={() => eliminarPregunta(question.id_pregunta)}>
                                                                        <img src="/images/eliminar.png" alt="trashIcon"
                                                                             className={`${styles.manage_icon}`}/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                            {reconocimientoTitle &&
                                <div className={`col-12 px-2`}>
                                    {reconocimientoQuestions.map((question, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_red}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div className={`col-sm-4 col-md-6 col-lg-6`}>
                                                                    <div className={`font-medium card-title pt-1 ${styles.card_test_text}`}>
                                                                        {question.pregunta}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-3 d-md-flex d-lg-flex justify-content-between pt-sm-3 pt-md-0 pt-lg-0`}>
                                                                    <button onClick={() => eliminarPregunta(question.id_pregunta)}>
                                                                        <img src="/images/eliminar.png" alt="trashIcon"
                                                                             className={`${styles.manage_icon}`}/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                            {busquedaTitle &&
                                <div className={`col-12 px-2`}>
                                    {busquedaQuestions.map((question, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_red}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div className={`col-sm-4 col-md-6 col-lg-6`}>
                                                                    <div className={`font-medium card-title pt-1 ${styles.card_test_text}`}>
                                                                        {question.pregunta}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-3 d-md-flex d-lg-flex justify-content-between pt-sm-3 pt-md-0 pt-lg-0`}>
                                                                    <button onClick={() => eliminarPregunta(question.id_pregunta)}>
                                                                        <img src="/images/eliminar.png" alt="trashIcon"
                                                                             className={`${styles.manage_icon}`}/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {successMessage &&
                <div>
                    <br/>
                    <div className="alert alert-success d-flex justify-content-center" role="alert">
                        ¡Pregunta eliminada Exitosamente!
                    </div>
                    <br/>
                </div>
            }
        </main>
    )
}