import axios from "axios";
import {useEffect, useState} from "react";
import sections from "@/styles/upperBarSectionColors.module.css";
import styles from "@/styles/styles.module.css";
import button from "@/styles/button.module.css";
import UpperBar from "@/components/UpperBar";
import QuestionBar from "@/components/QuestionBar";
import {useRouter} from "next/router";
import Swal from "sweetalert2";

export default function readPreguntaBusqueda() {
    const router = useRouter();
    let id_test;
    let nombre_test;
    if (typeof window !== 'undefined') {
        id_test = localStorage.getItem('id_test');
        nombre_test = localStorage.getItem('nombre_test');
    }
    let arregloPreguntas;
    /*------------------- ESTADOS -------------------*/
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [samples, setSamples] = useState([]);
    const [preguntaActual, setPreguntaActual] = useState('');
    const [totalPreguntas, setTotalPreguntas] = useState(0); // Estado para el total de preguntas
    const [preguntaActualIndex, setPreguntaActualIndex] = useState(1); // Estado para el índice de la pregunta actual
    const [puntaje, setPuntaje] = useState(0); // Estado para el puntaje final
    const [showSamples, setShowSamples] = useState(false); // Estado para mostrar las muestras
    const [goQuestion, setGoQuestion] = useState(false); // Estado para mostrar la pregunta
    /*------------------- EFECTOS -------------------*/
    useEffect(() => { // useEffect para obtener el usuario de la sesión
        getQuestionsbyTestId();
        showSamplesHandler();
    }, []);
    useEffect(() => {
        localStorage.setItem('puntaje', puntaje.toString());
    }, [puntaje]);
    /*------------------- FUNCIONES -------------------*/
    const showSamplesHandler = () => {
        setGoQuestion(false);
        setShowSamples(true);
        setTimeout(() => {
            setShowSamples(false);
            setGoQuestion(true);
        }, 5000);
    }
    const getQuestionsbyTestId = () => {
        axios({
            method: 'post',
            data: {
                id: id_test,
                id_ninio: localStorage.getItem('id_ninio'),
            },
            withCredentials: true,
            url: 'http://localhost:3002/getQuestionsbyTestId',
        }).then(res => {
            setQuestions(res.data);
            arregloPreguntas = res.data;
            setTotalPreguntas(res.data.length);
            if (arregloPreguntas.length > 0) {
                const firstQuestionId = res.data[0].id_pregunta;
                getAnswersbyQuestionId(firstQuestionId);
                getSamplesByQuestionId(firstQuestionId);
            }
        }).catch(err => {
            console.log(err);
        });
    }
    const getAnswersbyQuestionId = (id_question) => {
        axios({
            method: 'post',
            data: {
                id: id_question,
            },
            withCredentials: true,
            url: 'http://localhost:3002/getAnswersbyQuestionId',
        }).then(res => {
            console.log(res.data);
            setAnswers(res.data);
            showQuestion()
        }).catch(err => {
            console.log(err);
        })
    }
    const getSamplesByQuestionId = (id_question) => {
        axios({
            method: 'post',
            data: {
                id: id_question,
            },
            withCredentials: true,
            url: 'http://localhost:3002/getSamplesByQuestionId',
        }).then(res => {
            console.log(res.data);
            setSamples(res.data);
            showQuestion()
        }).catch(err => {
            console.log(err);
        })
    }
    const showQuestion = async () => {
        if (questions.length === 0 && arregloPreguntas) {
            setPreguntaActual(arregloPreguntas[0].pregunta);
        } else {
            if (questions.length > 0) {
                setPreguntaActual(questions[0].pregunta);
            }
        }
    }
    const verifyAnswer = (correct) => {
        if (correct === 1) {
            console.log("Respuesta correcta");
            setPuntaje(prevPuntaje => prevPuntaje + 1);
            let timerInterval;
            Swal.fire({
                icon: 'success',
                title: "¡Respuesta correcta!",
                timer: 3000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                },
                willClose: () => {
                    clearInterval(timerInterval);
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("I was closed by the timer");
                }
            });
        } else {
            console.log("Respuesta incorrecta");
            let timerInterval;
            Swal.fire({
                icon: 'error',
                title: "¡Respuesta incorrecta!",
                timer: 3000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                },
                willClose: () => {
                    clearInterval(timerInterval);
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("I was closed by the timer");
                }
            });
        }
        // Verificar si hay elementos en arregloPreguntas antes de hacer shift
        if (questions.length > 0) {
            // Hacer shift solo si hay elementos
            questions.shift();
        }
        setTimeout(() => {
            if (questions.length > 0) {
                showSamplesHandler();
                getAnswersbyQuestionId(questions[0].id_pregunta);
                getSamplesByQuestionId(questions[0].id_pregunta);
                setPreguntaActualIndex(prevPreguntaActualIndex => prevPreguntaActualIndex + 1);
            } else {
                console.log("No hay más preguntas");
                router.push('/puntajeFinal');
            }
        }, 3000);
    }
    const confirmGetBack = () => {
        Swal.fire({
            title: '¿Estás seguro que quieres regresar?',
            text: "¡Perderás todo el progreso de esta Evaluación!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'rgba(255,67,49)',
            cancelButtonColor: '#9CA3AF',
            confirmButtonText: 'Sí, quiero regresar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                router.push('/menuOpcionesTest');
            }
        })
    }
    return (
        <div className={`bg-amber-50 min-h-screen`}>
            <UpperBar redirectionPath={`/`}
                      color={sections.busqueda}></UpperBar>
            {showSamples && (
                <div>
                    <div className={`container-fluid px-5`}>
                        <div className={`row`}>
                            <div className={`col-sm-3 col-lg-2 pt-5`}>
                                <QuestionBar confirmGetBack={confirmGetBack}
                                             nombreTest={nombre_test}
                                             labelColor={styles.label_orange}></QuestionBar>
                            </div>
                            <div className={`col-sm-9 col-lg-10 pt-5`}>
                                <h5>
                                    Pregunta {preguntaActualIndex} / {totalPreguntas}
                                </h5>
                                <div className={`border-1 border-black rounded-2xl bg-white px-5 py-4
                        flex justify-center shadow-inner h-fit text-xl`}>
                                    ¿Puedes identificar a este animal?
                                </div>
                                <div className={`container-fluid h-fit p-0`}>
                                    <br/>
                                    <div className={`row`}>
                                        {samples.map((sample, index) => (
                                            <div className={`col-12 d-flex justify-content-center`}>
                                                <div key={index}
                                                     className={`flex justify-center shadow-md ${styles.sample_btn_busqueda}`}>
                                                    <img src={`/images/${sample.imagen}`} alt={`${sample.imagen}`}/>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <br/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {goQuestion && (
                <div>
                    <div className={`container-fluid px-5`}>
                        <div className={`row`}>
                            <div className={`col-sm-3 col-lg-2 pt-5`}>
                                <QuestionBar confirmGetBack={confirmGetBack}
                                             nombreTest={nombre_test}
                                             labelColor={styles.label_orange}/>
                            </div>
                            <div className={`col-sm-9 col-lg-10 pt-5`}>
                                <h5>
                                    Pregunta {preguntaActualIndex} / {totalPreguntas}
                                </h5>
                                <div className={`border-1 border-black rounded-2xl bg-white px-5 py-4
                        flex justify-center shadow-inner h-fit text-xl`}>
                                    ¡Selecciona el animal que apareció en pantalla hace unos segundos!
                                </div>
                                <br/> <br/>
                                <div className={`container-fluid px-0`}>
                                    <div className={`grid grid-cols-4 gap-x-5 gap-y-5 ps-16 pe-16`}>
                                        {answers.map((answer, index) => (
                                            <button key={index}
                                                    onClick={() => verifyAnswer(answer.respuesta_correcta)}
                                                    className={`${styles.answer_btn_comprension} flex justify-center 
                                shadow-md w-100 h-100`}>
                                                <img src={`/images/${answer.imagen}`} alt={`${answer.imagen}`}/>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}