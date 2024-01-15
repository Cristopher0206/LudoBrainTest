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
    /*------------------- ESTADOS -------------------*/
    const [questions, setQuestions] = useState([]);
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
    const [successMessage, setSuccessMessage] = useState(false); // Estado para el mensaje de registro
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
        getInformacionQuestions();
        getSemejanzasQuestions();
        getVocabularioQuestions();
        getComprensionQuestions();
        getDibujosQuestions();
        getNombresQuestions();
        getMatricesQuestions();
        getConceptosQuestions();
        getReconocimientoQuestions();
        getBusquedaQuestions();
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
                if (res.data.length !== 0){
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
                if (res.data.length !== 0){
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
                if (res.data.length !== 0){
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
                if (res.data.length !== 0){
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
                if (res.data.length !== 0){
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
                if (res.data.length !== 0){
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
                if (res.data.length !== 0){
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
                if (res.data.length !== 0){
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
                if (res.data.length !== 0){
                    setBusquedaTitle(true);
                }
            } else {
                console.error("No existe información", res);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar redirectionPath={`/`}
                      color={navstyles.upper_bar_red}></UpperBar>
            <InstructionBar previousPage={`/modulosCreacion`}
                            instruction={`Crea una nueva pregunta`}/>
            <AddButton createPage={`../select/selectSeccionPregunta`}
                       color={navstyles.upper_bar_red}/>
            <div className={`container-fluid`}>
                <br/> <br/>
                {informationTitle &&
                    <div className={`row justify-content-center`}>
                        <div className={`col-9`}>
                            <h3 className={`text-center`}>Información</h3>
                            {informationQuestions.map((question, index) => (
                                <div key={index} className={`row justify-content-center`}>
                                    <div className={`col-9`}>
                                        <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_red}`}>
                                            <div className={`card-body`}>
                                                <div className={`container-fluid`}>
                                                    <div className={`row justify-content-between`}>
                                                        <div className={`col-sm-4 col-lg-3`}>
                                                            <h5 className={`card-title pt-1`}>{question.pregunta}</h5>
                                                        </div>
                                                        <div
                                                            className={`col-sm-4 col-lg-2 d-flex justify-content-around`}>
                                                            <button /*onClick={() => eliminarNinio(question.id_ninio)}*/>
                                                                <img src="/images/eliminar.png" alt="trashIcon"
                                                                     className={`${styles.manage_icon}`}/>
                                                            </button>
                                                            <button /*onClick={() => goActualizarNinio(question.id_ninio)}*/>
                                                                <img src="/images/lapiz.png" alt="editIcon"
                                                                     className={`${styles.manage_icon} shadow-2xl`}/>
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
                    </div>
                }
                {semejanzasTitle &&
                    <div className={`row justify-content-center`}>
                        <div className={`col-9`}>
                            <h3 className={`text-center`}>Semejanzas</h3>
                            {semejanzasQuestions.map((question, index) => (
                                <div key={index} className={`row justify-content-center`}>
                                    <div className={`col-9`}>
                                        <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_red}`}>
                                            <div className={`card-body`}>
                                                <div className={`container-fluid`}>
                                                    <div className={`row justify-content-between`}>
                                                        <div className={`col-sm-4 col-lg-3`}>
                                                            <h5 className={`card-title pt-1`}>{question.pregunta}</h5>
                                                        </div>
                                                        <div
                                                            className={`col-sm-4 col-lg-2 d-flex justify-content-around`}>
                                                            <button /*onClick={() => eliminarNinio(question.id_ninio)}*/>
                                                                <img src="/images/eliminar.png" alt="trashIcon"
                                                                     className={`${styles.manage_icon}`}/>
                                                            </button>
                                                            <button /*onClick={() => goActualizarNinio(question.id_ninio)}*/>
                                                                <img src="/images/lapiz.png" alt="editIcon"
                                                                     className={`${styles.manage_icon} shadow-2xl`}/>
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
                    </div>
                }
                {vocabularioTitle &&
                    <div className={`row justify-content-center`}>
                        <div className={`col-9`}>
                            <h3 className={`text-center`}>Vocabulario</h3>
                            {vocabularioQuestions.map((question, index) => (
                                <div key={index} className={`row justify-content-center`}>
                                    <div className={`col-9`}>
                                        <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_red}`}>
                                            <div className={`card-body`}>
                                                <div className={`container-fluid`}>
                                                    <div className={`row justify-content-between`}>
                                                        <div className={`col-sm-4 col-lg-3`}>
                                                            <h5 className={`card-title pt-1`}>{question.pregunta}</h5>
                                                        </div>
                                                        <div
                                                            className={`col-sm-4 col-lg-2 d-flex justify-content-around`}>
                                                            <button /*onClick={() => eliminarNinio(question.id_ninio)}*/>
                                                                <img src="/images/eliminar.png" alt="trashIcon"
                                                                     className={`${styles.manage_icon}`}/>
                                                            </button>
                                                            <button /*onClick={() => goActualizarNinio(question.id_ninio)}*/>
                                                                <img src="/images/lapiz.png" alt="editIcon"
                                                                     className={`${styles.manage_icon} shadow-2xl`}/>
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
                    </div>
                }
                {comprensionTitle &&
                    <div className={`row justify-content-center`}>
                        <div className={`col-9`}>
                            <h3 className={`text-center`}>Comprensión</h3>
                            {comprensionQuestions.map((question, index) => (
                                <div key={index} className={`row justify-content-center`}>
                                    <div className={`col-9`}>
                                        <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_red}`}>
                                            <div className={`card-body`}>
                                                <div className={`container-fluid`}>
                                                    <div className={`row justify-content-between`}>
                                                        <div className={`col-sm-4 col-lg-3`}>
                                                            <h5 className={`card-title pt-1`}>{question.pregunta}</h5>
                                                        </div>
                                                        <div
                                                            className={`col-sm-4 col-lg-2 d-flex justify-content-around`}>
                                                            <button /*onClick={() => eliminarNinio(question.id_ninio)}*/>
                                                                <img src="/images/eliminar.png" alt="trashIcon"
                                                                     className={`${styles.manage_icon}`}/>
                                                            </button>
                                                            <button /*onClick={() => goActualizarNinio(question.id_ninio)}*/>
                                                                <img src="/images/lapiz.png" alt="editIcon"
                                                                     className={`${styles.manage_icon} shadow-2xl`}/>
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
                    </div>
                }
                {dibujosTitle &&
                    <div className={`row justify-content-center`}>
                        <div className={`col-9`}>
                            <h3 className={`text-center`}>Dibujos</h3>
                            {dibujosQuestions.map((question, index) => (
                                <div key={index} className={`row justify-content-center`}>
                                    <div className={`col-9`}>
                                        <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_red}`}>
                                            <div className={`card-body`}>
                                                <div className={`container-fluid`}>
                                                    <div className={`row justify-content-between`}>
                                                        <div className={`col-sm-4 col-lg-3`}>
                                                            <h5 className={`card-title pt-1`}>{question.pregunta}</h5>
                                                        </div>
                                                        <div
                                                            className={`col-sm-4 col-lg-2 d-flex justify-content-around`}>
                                                            <button /*onClick={() => eliminarNinio(question.id_ninio)}*/>
                                                                <img src="/images/eliminar.png" alt="trashIcon"
                                                                     className={`${styles.manage_icon}`}/>
                                                            </button>
                                                            <button /*onClick={() => goActualizarNinio(question.id_ninio)}*/>
                                                                <img src="/images/lapiz.png" alt="editIcon"
                                                                     className={`${styles.manage_icon} shadow-2xl`}/>
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
                    </div>
                }
                {nombresTitle &&
                    <div className={`row justify-content-center`}>
                        <div className={`col-9`}>
                            <h3 className={`text-center`}>Nombres</h3>
                            {nombresQuestions.map((question, index) => (
                                <div key={index} className={`row justify-content-center`}>
                                    <div className={`col-9`}>
                                        <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_red}`}>
                                            <div className={`card-body`}>
                                                <div className={`container-fluid`}>
                                                    <div className={`row justify-content-between`}>
                                                        <div className={`col-sm-4 col-lg-3`}>
                                                            <h5 className={`card-title pt-1`}>{question.pregunta}</h5>
                                                        </div>
                                                        <div
                                                            className={`col-sm-4 col-lg-2 d-flex justify-content-around`}>
                                                            <button /*onClick={() => eliminarNinio(question.id_ninio)}*/>
                                                                <img src="/images/eliminar.png" alt="trashIcon"
                                                                     className={`${styles.manage_icon}`}/>
                                                            </button>
                                                            <button /*onClick={() => goActualizarNinio(question.id_ninio)}*/>
                                                                <img src="/images/lapiz.png" alt="editIcon"
                                                                     className={`${styles.manage_icon} shadow-2xl`}/>
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
                    </div>
                }
                {matricesTitle &&
                    <div className={`row justify-content-center`}>
                        <div className={`col-9`}>
                            <h3 className={`text-center`}>Matrices</h3>
                            {matricesQuestions.map((question, index) => (
                                <div key={index} className={`row justify-content-center`}>
                                    <div className={`col-9`}>
                                        <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_red}`}>
                                            <div className={`card-body`}>
                                                <div className={`container-fluid`}>
                                                    <div className={`row justify-content-between`}>
                                                        <div className={`col-sm-4 col-lg-3`}>
                                                            <h5 className={`card-title pt-1`}>{question.pregunta}</h5>
                                                        </div>
                                                        <div
                                                            className={`col-sm-4 col-lg-2 d-flex justify-content-around`}>
                                                            <button /*onClick={() => eliminarNinio(question.id_ninio)}*/>
                                                                <img src="/images/eliminar.png" alt="trashIcon"
                                                                     className={`${styles.manage_icon}`}/>
                                                            </button>
                                                            <button /*onClick={() => goActualizarNinio(question.id_ninio)}*/>
                                                                <img src="/images/lapiz.png" alt="editIcon"
                                                                     className={`${styles.manage_icon} shadow-2xl`}/>
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
                    </div>
                }
                {conceptosTitle &&
                    <div className={`row justify-content-center`}>
                        <div className={`col-9`}>
                            <h3 className={`text-center`}>Conceptos</h3>
                            {conceptosQuestions.map((question, index) => (
                                <div key={index} className={`row justify-content-center`}>
                                    <div className={`col-9`}>
                                        <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_red}`}>
                                            <div className={`card-body`}>
                                                <div className={`container-fluid`}>
                                                    <div className={`row justify-content-between`}>
                                                        <div className={`col-sm-4 col-lg-3`}>
                                                            <h5 className={`card-title pt-1`}>{question.pregunta}</h5>
                                                        </div>
                                                        <div
                                                            className={`col-sm-4 col-lg-2 d-flex justify-content-around`}>
                                                            <button /*onClick={() => eliminarNinio(question.id_ninio)}*/>
                                                                <img src="/images/eliminar.png" alt="trashIcon"
                                                                     className={`${styles.manage_icon}`}/>
                                                            </button>
                                                            <button /*onClick={() => goActualizarNinio(question.id_ninio)}*/>
                                                                <img src="/images/lapiz.png" alt="editIcon"
                                                                     className={`${styles.manage_icon} shadow-2xl`}/>
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
                    </div>
                }
                {reconocimientoTitle &&
                    <div className={`row justify-content-center`}>
                        <div className={`col-9`}>
                            <h3 className={`text-center`}>Reconocimiento</h3>
                            {reconocimientoQuestions.map((question, index) => (
                                <div key={index} className={`row justify-content-center`}>
                                    <div className={`col-9`}>
                                        <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl 
                                            ${styles.card_body_red}`}>
                                            <div className={`card-body`}>
                                                <div className={`container-fluid`}>
                                                    <div className={`row justify-content-between`}>
                                                        <div className={`col-sm-4 col-lg-3`}>
                                                            <h5 className={`card-title pt-1`}>
                                                                {question.pregunta}
                                                            </h5>
                                                        </div>
                                                        <div
                                                            className={`col-sm-4 col-lg-2 d-flex justify-content-around`}>
                                                            <button>
                                                                <img src="/images/eliminar.png" alt="trashIcon"
                                                                     className={`${styles.manage_icon}`}/>
                                                            </button>
                                                            <button>
                                                                <img src="/images/lapiz.png" alt="editIcon"
                                                                     className={`${styles.manage_icon} shadow-2xl`}/>
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
                            <br/>
                        </div>
                    </div>
                }
                {busquedaTitle &&
                    <div className={`row justify-content-center`}>
                        <div className={`col-9`}>
                            <h3 className={`text-center`}>Búsqueda</h3>
                            {busquedaQuestions.map((question, index) => (
                                <div key={index} className={`row justify-content-center`}>
                                    <div className={`col-9`}>
                                        <div
                                            className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl 
                                            ${styles.card_body_red}`}>
                                            <div className={`card-body`}>
                                                <div className={`container-fluid`}>
                                                    <div
                                                        className={`row justify-content-between`}>
                                                        <div
                                                            className={`col-sm-4 col-lg-3`}>
                                                            <h5
                                                                className={`card-title pt-1`}>
                                                                {question.pregunta}
                                                            </h5>
                                                        </div>
                                                        <div
                                                            className={`col-sm-4 col-lg-2 d-flex justify-content-around`}>
                                                            <button>
                                                                <img src="/images/eliminar.png"
                                                                     alt="trashIcon"
                                                                     className={`${styles.manage_icon}`}/>
                                                            </button>
                                                            <button>
                                                                <img src="/images/lapiz.png"
                                                                     alt="editIcon"
                                                                     className={`${styles.manage_icon} shadow-2xl`}/>
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
                            <br/>
                        </div>
                    </div>
                }
            </div>

        </main>
    )
}