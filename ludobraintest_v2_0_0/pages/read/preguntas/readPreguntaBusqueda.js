import axios from "axios";
import {useEffect, useState} from "react";
import sections from "@/styles/upperBarSectionColors.module.css";
import styles from "@/styles/styles.module.css";
import UpperBar from "@/components/UpperBar";
import QuestionBar from "@/components/QuestionBar";
import {useRouter} from "next/router";

export default function readPreguntaBusqueda() {
    const router = useRouter();
    const id_test = localStorage.getItem('id_test');
    let arregloPreguntas;
    /*------------------- ESTADOS -------------------*/
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [samples, setSamples] = useState([]);
    const [preguntaActual, setPreguntaActual] = useState('');
    const [successMessage, setSuccessMessage] = useState(false); // Estado para respuestas correctas
    const [wrongMessage, setWrongMessage] = useState(false); // Estado para respuestas incorrectas
    const [puntaje, setPuntaje] = useState(0); // Estado para el puntaje final
    const [showSamples, setShowSamples] = useState(false); // Estado para mostrar las muestras
    const [goQuestion, setGoQuestion] = useState(false); // Estado para mostrar la pregunta
    /*------------------- EFECTOS -------------------*/
    useEffect(() => { // useEffect para obtener el usuario de la sesión
        getQuestionsbyTestId();
        showSamplesHandler();
    }, []);
    useEffect(() => {
        console.log("puntaje después de responder:", puntaje);
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
            url: 'http://localhost:3001/getQuestionsbyTestId',
        }).then(res => {
            setQuestions(res.data);
            //setPuntaje(res.data[0].puntaje);
            arregloPreguntas = res.data;
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
            url: 'http://localhost:3001/getAnswersbyQuestionId',
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
            url: 'http://localhost:3001/getSamplesByQuestionId',
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
            setSuccessMessage(true);
            setPuntaje(prevPuntaje => prevPuntaje + 1);
        } else {
            console.log("Respuesta incorrecta");
            setWrongMessage(true);
        }
        setTimeout(() => {
            setSuccessMessage(false);
            setWrongMessage(false);
        }, 3000);
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
            } else {
                console.log("No hay más preguntas");
                router.push('/puntajeFinal');
            }
        }, 3000);
    }
    return (
        <div className={`bg-amber-50 min-h-screen`}>
            <UpperBar redirectionPath={`/`}
                      color={sections.busqueda}></UpperBar>
            {showSamples && (
                <div>
                    <div className={`container-fluid`}>
                        <div className={`row`}>
                            <div className={`col-sm-3 col-lg-2`}>
                                <QuestionBar previousPage={`/menuOpcionesTest`}></QuestionBar>
                            </div>
                            <div className={`col-sm-9 col-lg-10 ps-sm-3 ps-lg-0 pe-sm-4 pe-lg-5 pt-4`}>
                                <div className={`border-1 border-black rounded-2xl bg-white px-5 py-4
                        flex justify-center shadow-inner h-fit`}>
                                    ¿Puedes identificar a este animal?
                                </div>
                                <div className={`container-fluid h-fit`}>
                                    <br/>
                                    <div className={`row ps-16 pe-16`}>
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
                    <div className={`container-fluid`}>
                        <div className={`row`}>
                            <div className={`col-sm-3 col-lg-3`}>
                                <QuestionBar previousPage={`/menuOpcionesTest`}></QuestionBar>
                            </div>
                            <div className={`col-sm-9 col-lg-9 ps-sm-3 ps-lg-0 pe-sm-4 pe-lg-5 pt-4`}>
                                <div className={`border-1 border-black rounded-2xl bg-white px-5 py-4
                        flex justify-center shadow-inner h-100`}>
                                    ¡Selecciona el animal que apareció en pantalla hace unos segundos!
                                </div>
                            </div>
                            <br/>
                            <div className={`container-fluid`}>
                                <br/><br/><br/>
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
                                <br/>
                            </div>
                        </div>
                    </div>
                    <br/>
                    {successMessage && (
                        <div>
                            <div className="alert alert-success d-flex justify-content-center" role="alert">
                                ¡RESPUESTA CORRECTA!
                            </div>
                            <br/>
                        </div>
                    )}
                    {wrongMessage && (
                        <div>
                            <div className="alert alert-danger d-flex justify-content-center" role="alert">
                                ¡RESPUESTA INCORRECTA!
                            </div>
                            <br/>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}