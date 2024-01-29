import UpperBar from "@/components/UpperBar";
import navstyles from "@/styles/navstyles.module.css";
import styles from "@/styles/styles.module.css";
import button from "@/styles/button.module.css";
import InstructionBar from "@/components/InstructionBar";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import Button from "@/components/Button";

export default function CreateTest() {
    const router = useRouter();
    let section;
    /*------------------- ESTADOS -------------------*/
    const [nombreTest, setNombreTest] = useState('');
    const [seccion, setSeccion] = useState('');
    const [newPreguntas, setNewPreguntas] = useState([]);
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
            } else if (res.data.message === "Este test ya ha sido creado"){
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
                            <option value="">Selecciona una sección</option>
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
                                                <button onClick={() => {deleteQuestionFromTest(pregunta)}}
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
                            ¡Test creado correctamente!
                        </div>
                    </div>
                )}
                {warningMessage && (
                    <div>
                        <div className="alert alert-warning d-flex justify-content-center" role="alert">
                            ¡Este test ya ha sido creado!
                        </div>
                    </div>
                )
                }
                <div className={`flex justify-center`}>
                    <div className={`w-25`}>
                        <Button text={`Agregar Test`} instruction={createTest} bg_color={button.btn_green}></Button>
                    </div>
                </div>
                <br/>
            </div>
        </main>
    )
}