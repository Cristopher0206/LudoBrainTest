import axios from "axios";
import {useEffect, useState} from "react";
import sections from "@/styles/upperBarSectionColors.module.css";
import styles from "@/styles/styles.module.css";
import UpperBar from "@/components/UpperBar";
import QuestionBar from "@/components/QuestionBar";
import {useRouter} from "next/router";
import navstyles from "@/styles/navstyles.module.css";

export default function readPreguntaReconocimiento() {
    const router = useRouter();
    const id_test = localStorage.getItem('id_test');
    let arregloPreguntas;
    /*------------------- ESTADOS -------------------*/
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [samples, setSamples] = useState([]);
    const [preguntaActual, setPreguntaActual] = useState('');
    const [selectedAnswers, setSelectedAnswers] = useState([]); // Estado para respuestas seleccionadas
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
            console.log("Estas son las opciones de respuesta", res.data);
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
        // Limpiar respuestas seleccionadas al mostrar una nueva pregunta
        setSelectedAnswers([]);
    }
    const handleAnswerClick = (answerId) => {
        // Verificar si la respuesta ya está seleccionada
        if (selectedAnswers.includes(answerId)) {
            // Si ya está seleccionada, quitarla
            setSelectedAnswers(selectedAnswers.filter(id => id !== answerId));
        } else {
            // Si no está seleccionada, agregarla (máximo 2 respuestas)
            if (selectedAnswers.length < 2) {
                setSelectedAnswers([...selectedAnswers, answerId]);
            }
        }
        console.log("Arreglo de respuestas seleccionadas:", selectedAnswers);
    }
    const isAnswerSelected = (answerId) => {
        return selectedAnswers.includes(answerId);
    }
    const verifyAnswer = () => {
        // Verificar si las respuestas seleccionadas son correctas
        const isCorrect = selectedAnswers.length === 2 &&
            selectedAnswers.every(answerId => answers.find(a => a.id_respuesta === answerId)?.respuesta_correcta === 1);
        if (isCorrect) {
            console.log("Respuestas correctas");
            setSuccessMessage(true);
            setPuntaje(prevPuntaje => prevPuntaje + 1);
        } else {
            console.log("Respuestas incorrectas");
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
                getSamplesByQuestionId(questions[0].id_pregunta)
                getAnswersbyQuestionId(questions[0].id_pregunta);
            } else {
                console.log("No hay más preguntas");
                router.push('/puntajeFinal');
            }
        }, 3000);
    }
    return (
        <div className={`bg-amber-50 min-h-screen`}>
            <UpperBar redirectionPath={`/`}
                      color={sections.reconocimiento}></UpperBar>
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
                                    ¡Observa con atención las imágenes que aparecen en pantalla!
                                </div>
                                <div className={`container-fluid`}>
                                    <br/>
                                    <div className={`grid grid-cols-2 gap-x-5 gap-y-5 pe-16`}>
                                        {samples.map((sample, index) => (
                                            <div key={index}
                                                 className={`flex justify-center shadow-md w-100 h-100 ${styles.answer_btn}`}>
                                                <img src={`/images/${sample.imagen}`} alt={`${sample.imagen}`}/>
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
                            <div className={`col-sm-3 col-lg-2`}>
                                <QuestionBar previousPage={`/menuOpcionesTest`}></QuestionBar>
                            </div>
                            <div className={`col-sm-9 col-lg-10 ps-sm-3 ps-lg-0 pe-sm-4 pe-lg-5 pt-4`}>
                                <div className={`border-1 border-black rounded-2xl bg-white px-5 py-4
                        flex justify-center shadow-inner h-fit`}>
                                    De todo este conjunto de imágenes, ¿Cuáles aparecieron en pantalla hace unos
                                    segundos?
                                </div>
                                <div className={`container-fluid`}>
                                    <br/>
                                    <div className={`grid grid-cols-4 gap-x-5 gap-y-5 pe-16`}>
                                        {answers.map((answer, index) => (
                                            <button
                                                key={index}
                                                className={`flex justify-center shadow-md w-100 h-100 
                                               ${isAnswerSelected(answer.id_respuesta) ? styles.selected_answer_card_recon : styles.answer_btn}`}
                                                onClick={() => {
                                                    handleAnswerClick(answer.id_respuesta)
                                                }}>
                                                <img src={`/images/${answer.imagen}`} alt={`${answer.imagen}`}/>
                                            </button>
                                        ))}
                                    </div>
                                    <br/>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className={`d-flex justify-content-center`}>
                            <button onClick={verifyAnswer} className={`px-5 py-2 text-black rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${navstyles.upper_bar_red} ${styles.btn_text}`}>
                                Verificar Respuestas
                            </button>
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
            )
            }
        </div>
    )
}