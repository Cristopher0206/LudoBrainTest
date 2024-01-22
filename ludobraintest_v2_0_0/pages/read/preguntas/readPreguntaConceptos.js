import axios from "axios";
import {useEffect, useState} from "react";
import sections from "@/styles/upperBarSectionColors.module.css";
import styles from "@/styles/styles.module.css";
import UpperBar from "@/components/UpperBar";
import QuestionBar from "@/components/QuestionBar";
import {useRouter} from "next/router";
import navstyles from "@/styles/navstyles.module.css";

const initialSelectedAnswers = {
    fila1: null,
    fila2: null,
    fila3: null,
};
const correctAnswersByRow = {
    fila1: null,
    fila2: null,
    fila3: null,
}
export default function ReadPreguntaConceptos() {
    const router = useRouter();
    const id_test = localStorage.getItem('id_test');
    let arregloPreguntas;
    /*------------------- ESTADOS -------------------*/
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [preguntaActual, setPreguntaActual] = useState('');
    const [successMessage, setSuccessMessage] = useState(false); // Estado para respuestas correctas
    const [wrongMessage, setWrongMessage] = useState(false); // Estado para respuestas incorrectas
    const [puntaje, setPuntaje] = useState(0); // Estado para el puntaje final
    //
    const [selectedAnswers, setSelectedAnswers] = useState(initialSelectedAnswers);
    const [correctAnswers, setCorrectAnswers] = useState(correctAnswersByRow);
    /*------------------- EFECTOS -------------------*/
    useEffect(() => { // useEffect para obtener el usuario de la sesión
        getQuestionsbyTestId();
    }, []);
    useEffect(() => {
        localStorage.setItem('puntaje', puntaje.toString());
    }, [puntaje]);
    /*------------------- FUNCIONES -------------------*/
    const getQuestionsbyTestId = () => {
        setSelectedAnswers(initialSelectedAnswers);
        setCorrectAnswers(initialSelectedAnswers);
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
            console.log("Estas son las opciones de respuesta",res.data);
            setAnswers(res.data);
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
    const verifyAnswer = () => {
        if (correctAnswers.fila1 === 1 && correctAnswers.fila2 === 1 && correctAnswers.fila3 === 1) {
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
                getAnswersbyQuestionId(questions[0].id_pregunta);
            } else {
                console.log("No hay más preguntas");
                router.push('/puntajeFinal');
            }
        }, 3000);
    }
    const handleSelectedAnswer = (e, respuestaCorrecta, fila) => {
        console.log("id de la respuesta", e);
        const selectedAnswerId = e;
        const correctAnswer = respuestaCorrecta;
        // Desmarca la respuesta previamente seleccionada en la misma fila
        setSelectedAnswers((prevSelectedAnswers) => ({
            ...prevSelectedAnswers,
            [fila]: selectedAnswerId,
        }));
        setCorrectAnswers((prevCorrectAnswers) => ({
            ...prevCorrectAnswers,
            [fila]: correctAnswer,
        }));
        console.log("selectedAnswers", selectedAnswers);
        console.log("respuestasCorrectas", correctAnswers);
    }
    return (
        <div className={`bg-amber-50 min-h-screen`}>
            <UpperBar redirectionPath={`/`}
                      color={sections.conceptos}></UpperBar>
            <br/>
            <div className={`container-fluid`}>
                <div className={`row`}>
                    <div className={`col-sm-3 col-lg-2`}>
                        <QuestionBar previousPage={`/menuOpcionesTest`}></QuestionBar>
                    </div>
                    <div className={`col-sm-9 col-lg-10 ps-sm-3 ps-lg-0 pe-sm-4 pe-lg-5 pt-4`}>
                        <div className={`border-1 border-black rounded-2xl bg-white px-5 py-4
                        flex justify-center shadow-inner h-fit`}>
                            ¡Debes elegir una imagen de cada fila! Recuerda que las imágenes deben tener alguna
                            relación entre sí.
                        </div>
                        <div className={`container-fluid`}>
                            <br/>
                            <h4 className={`${styles.label_blue}`}>Fila 1</h4>
                            <div className={`row justify-content-center`}>
                                {answers.map((answer, index) => (
                                    answer.numero_fila <= 1 && (
                                        <div className={`col-3`} key={index}>
                                            <button
                                                className={`flex justify-center shadow-md w-100 h-100 
                                                ${selectedAnswers.fila1 === answer.id_respuesta ? styles.selected_answer_card : styles.answer_btn_conceptos}`}
                                                onClick={() => {
                                                    /*verifyAnswer(answer.respuesta_correcta);*/
                                                    handleSelectedAnswer(answer.id_respuesta, answer.respuesta_correcta, 'fila1')
                                                }}>
                                                <img src={`/images/${answer.imagen}`} alt={`${answer.imagen}`}/>
                                            </button>
                                        </div>
                                    )
                                ))}
                            </div>
                            <br/>
                            <h4 className={`${styles.label_blue}`}>Fila 2</h4>
                            <div className={`row justify-content-center`}>
                                {answers.map((answer, index) => (
                                    answer.numero_fila === 2 && (
                                        <div className={`col-3`} key={index}>
                                            <button
                                                className={`flex justify-center shadow-md w-100 h-100 
                                                ${selectedAnswers.fila2 === answer.id_respuesta ? styles.selected_answer_card : styles.answer_btn_conceptos}`}
                                                onClick={() => {
                                                    /*verifyAnswer(answer.respuesta_correcta);*/
                                                    handleSelectedAnswer(answer.id_respuesta, answer.respuesta_correcta, 'fila2')
                                                }}>
                                                <img src={`/images/${answer.imagen}`} alt={`${answer.imagen}`}/>
                                            </button>
                                        </div>
                                    )
                                ))}
                            </div>
                            <br/>
                            <h4 className={`${styles.label_blue}`}>Fila 3</h4>
                            <div className={`row justify-content-center`}>
                                {answers.map((answer, index) => (
                                    answer.numero_fila === 3 && (
                                        <div className={`col-3`} key={index}>
                                            <button
                                                className={`flex justify-center shadow-md w-100 h-100 
                                                ${selectedAnswers.fila3 === answer.id_respuesta ? styles.selected_answer_card : styles.answer_btn_conceptos}`}
                                                onClick={() => {
                                                    /*verifyAnswer(answer.respuesta_correcta);*/
                                                    handleSelectedAnswer(answer.id_respuesta, answer.respuesta_correcta, 'fila3')
                                                }}>
                                                <img src={`/images/${answer.imagen}`} alt={`${answer.imagen}`}/>
                                            </button>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div className={`d-flex justify-content-center`}>
                    <button onClick={verifyAnswer} className={`px-5 py-2 text-black rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${navstyles.upper_bar_skyblue} ${styles.btn_text}`}>
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