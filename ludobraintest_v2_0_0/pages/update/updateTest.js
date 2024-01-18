import UpperBar from "@/components/UpperBar";
import navstyles from "@/styles/navstyles.module.css";
import styles from "@/styles/styles.module.css";
import InstructionBar from "@/components/InstructionBar";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";

export default function UpdateTest() {
    const router = useRouter();
    let section;
    /*------------------- ESTADOS -------------------*/
    const [nombreTest, setNombreTest] = useState('');
    const [seccion, setSeccion] = useState('');
    const [newPreguntas, setNewPreguntas] = useState([]);
    const [info, setInfo] = useState(sessionStorage.getItem("dataToPass"));
    const [nombreActual, setNombreActual] = useState('');
    const [seccionActual, setSeccionActual] = useState('');
    /* Estados para los arrays */
    const [secciones, setSecciones] = useState([]);
    const [preguntas, setPreguntas] = useState([]);
    /* Estados para los mensajes */
    const [successMessage, setSuccessMessage] = useState(false); // Estado para la confirmacion de registro
    const [warningLengthMessage, setWarningLengthMessage] = useState(false); // Estado para la advertencia de registro
    const [warningMessage, setWarningMessage] = useState(false); // Estado para la advertencia de registro
    /*------------------- EFECTOS -------------------*/
    useEffect(() => {
        getSecciones();
        getCurrentInformation();
        getPreguntasByIdTest();
        setNombreTest(nombreActual);
        setSeccion(seccionActual);
    }, []);
    /*------------------- FUNCIONES -------------------*/
    const clearFields = () => {
        setNombreTest('');
        setSeccion('');
        setNewPreguntas([]);
    }
    // Manejar el cambio de archivos para Información
    const getSecciones = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/getSections"
        }).then((res) => {
            setSecciones(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }
    const getCurrentInformation = () => {
        axios({
            method: "post",
            withCredentials: true,
            data: {
                id_test: info
            },
            url: "http://localhost:3001/getCurrentInformation",
        }).then((res) => {
            setNombreActual(res.data[0].nombre_test);
            setSeccionActual(res.data[0].nombre_seccion);
            setNombreTest(res.data[0].nombre_test);
            setSeccion(res.data[0].nombre_seccion)
        }).catch((err) => {
            console.log(err);
        })
    }
    const getPreguntasByIdTest = () => {
        axios({
            method: "post",
            withCredentials: true,
            data: {
                id_test: info
            },
            url: "http://localhost:3001/getPreguntasByIdTest"
        }).then((res) => {
            setNewPreguntas(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }
    const setNombreSeccion = (e) => {
        setSeccion(e.target.value);
    }
    const getPreguntasBySeccion = () => {
        axios({
            method: "post",
            withCredentials: true,
            data: {
                seccion: section
            },
            url: "http://localhost:3001/getPreguntasBySeccion",
        }).then((res) => {
            setPreguntas(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }
    const addQuestionToTest = (pregunta) => {
        if (newPreguntas.length < 10) {
            setNewPreguntas([...newPreguntas, pregunta]);
        } else {
            setWarningLengthMessage(true);
            // El mensaje desaparece luego de 3 segundos
            setTimeout(() => {
                setWarningLengthMessage(false);
            }, 3000);
        }
    }
    const deleteQuestionFromTest = (pregunta) => {
        setNewPreguntas(newPreguntas.filter((newPregunta) => newPregunta.id_pregunta !== pregunta.id_pregunta));
    }
    const updateTest = () => {
        axios({
            method: "post",
            withCredentials: true,
            data: {
                id_test: info
            },
            url: "http://localhost:3001/deleteTest",
        }).then((res) => {
            console.log(res);
            createTest();
        }).catch((err) => {
            console.log(err);
        })
    }
    const createTest = () => {
        axios({
            method: "post",
            withCredentials: true,
            data: {
                nombre: nombreTest,
                seccion: seccion,
                preguntas: newPreguntas
            },
            url: "http://localhost:3001/createTest",
        }).then((res) => {
            console.log(res);
            if (res.data.message === "Test creado correctamente"){
                // Si el test se crea, muestra un mensaje de confirmacion
                setSuccessMessage(true);
                // El mensaje desaparece luego de 3 segundos
                setTimeout(() => {
                    setSuccessMessage(false);
                    router.push(`../read/readTest`);
                }, 3000);
                clearFields();
            } else if (res.data.message === "No se pudo actualizar el test"){
                // Si el test ya existe, muestra un mensaje de advertencia
                setWarningMessage(true);
                // El mensaje desaparece luego de 3 segundos
                setTimeout(() => {
                    setWarningMessage(false);
                }, 3000);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar redirectionPath={`/`}
                      color={navstyles.upper_bar_green}/>
            <InstructionBar previousPage={`../read/readTest`}
                            instruction={`Crea un Test`}/>
            <div className={`container-fluid`}>
                <div className={`row`}>
                    <div className={`col-6`}>
                        <h5>¿Cómo se llama el test?</h5>
                        <input type="text"
                               value={nombreTest}
                               onChange={(e) => setNombreTest(e.target.value)}
                               className={`w-100 border-1 border-black shadow-md rounded-2xl p-3`}/>
                    </div>
                    <div className={`col-6`}>
                        <h5>¿A qué sección pertenece?</h5>
                        <select value={seccion}
                                onChange={(e) => {
                                    setNombreSeccion(e);
                                    section = e.target.value;
                                    getPreguntasBySeccion();
                                }
                                }
                                className={`w-100 border-1 border-black shadow-md rounded-2xl p-3`}>
                            <option value={`${seccionActual}`}>{seccionActual}</option>
                            {secciones.map((seccion) => (
                                <option key={seccion.id_seccion} value={seccion.nombre_seccion}>
                                    {seccion.nombre_seccion}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <br/>
                <h5>Preguntas</h5>
                {warningLengthMessage && (
                    <div>
                        <div className="alert alert-warning d-flex justify-content-center" role="alert">
                            ¡No se puede añadir más de 10 preguntas!
                        </div>
                    </div>
                )}
                <div className={`container-fluid`}>
                    <div className={`row justify-content-around`}>
                        <div className={`col-5 border-1 border-black shadow-md rounded-2xl p-3 bg-white
                        ${styles.overflow_container_test2}`}>
                            {newPreguntas.map((pregunta) => (
                                <div key={pregunta.id_pregunta}>
                                    <div className={`container-fluid px-5`}>
                                        <div className={`row d-flex py-2 px-5 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_green}`}>
                                            <div className={`col-1 d-flex justify-content-end`}>
                                                <button onClick={() => {
                                                    deleteQuestionFromTest(pregunta)
                                                }}
                                                        className={`${styles.minus_btn} py-2 px-3 font-bold`}>
                                                    -
                                                </button>
                                            </div>
                                            <div className={`col-6`}>
                                                <div className={`pt-2 font-medium`}>
                                                    {pregunta.pregunta}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                </div>
                            ))}
                        </div>
                        <div className={`col-5 border-1 border-black shadow-md rounded-2xl p-3 bg-white 
                        ${styles.overflow_container_test2}`}>
                            {preguntas.map((pregunta) => (
                                <div key={pregunta.id_pregunta}>
                                    <div className={`container-fluid px-5`}>
                                        <div className={`row d-flex py-2 px-5 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_green}`}>
                                            <div className={`col-1 d-flex justify-content-end`}>
                                                <button onClick={() => addQuestionToTest(pregunta)}
                                                        className={`${styles.add_btn} py-2 px-3 font-bold`}>
                                                    +
                                                </button>
                                            </div>
                                            <div className={`col-6`}>
                                                <div className={`pt-2 font-medium`}>
                                                    {pregunta.pregunta}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </div>
                <br/>
                {successMessage && (
                    <div>
                        <div className="alert alert-success d-flex justify-content-center" role="alert">
                            ¡Test actualizado correctamente!
                        </div>
                    </div>
                )}
                {warningMessage && (
                    <div>
                        <div className="alert alert-warning d-flex justify-content-center" role="alert">
                            ¡No se pudo actualizar el test!
                        </div>
                    </div>
                )
                }
                <div className={`d-flex justify-content-center`}>
                    <button onClick={updateTest}
                            className={`px-5 py-2 text-black rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 
                    ${navstyles.upper_bar_green} ${styles.btn_text}`}>
                        Actualizar Test
                    </button>
                </div>
                <br/>
            </div>
        </main>
    )
}