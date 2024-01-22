import axios from "axios";
import {useEffect, useState} from "react";
import sections from "@/styles/upperBarSectionColors.module.css";
import styles from "@/styles/styles.module.css";
import UpperBar from "@/components/UpperBar";
import QuestionBar from "@/components/QuestionBar";
import {useRouter} from "next/router";

export default function ReadPreguntaDibujos() {
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
    /*------------------- EFECTOS -------------------*/
    useEffect(() => { // useEffect para obtener el usuario de la sesión
        getQuestionsbyTestId();
    }, []);
    useEffect(() => {
        console.log("puntaje después de responder:", puntaje);
        localStorage.setItem('puntaje', puntaje.toString());
    }, [puntaje]);
    /*------------------- FUNCIONES -------------------*/
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
                      color={sections.dibujos}></UpperBar>
            <br/>
            <div className={`container-fluid`}>
                <div className={`row`}>
                    <div className={`col-sm-3 col-lg-3`}>
                        <QuestionBar previousPage={`/menuOpcionesTest`}></QuestionBar>
                    </div>
                    <div className={`col-sm-3 col-lg-2`}>
                        <div className={`border-1 border-black rounded-2xl bg-white py-5
                        flex justify-center shadow-inner h-100`}>
                            {preguntaActual}
                        </div>
                    </div>
                    <div className={`col-7`}>
                        <div className={`py-3 d-flex justify-content-center font-bold`}>
                            Selecciona la imagen que coincide con la palabra
                        </div>
                        <div className={`grid grid-cols-3 gap-x-5 gap-y-5 pe-16`}>
                            {answers.map((answer, index) => (
                                <button key={index} onClick={() => verifyAnswer(answer.respuesta_correcta)}
                                        className={`${styles.answer_btn_dibujos}`}>
                                    <img src={`/images/${answer.imagen}`} alt={`${answer.imagen}`}/>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                {successMessage && (
                    <div>
                        <br/>
                        <div className="alert alert-success d-flex justify-content-center" role="alert">
                            ¡RESPUESTA CORRECTA!
                        </div>
                        <br/>
                    </div>
                )}
                {wrongMessage && (
                    <div>
                        <br/>
                        <div className="alert alert-danger d-flex justify-content-center" role="alert">
                            ¡RESPUESTA INCORRECTA!
                        </div>
                        <br/>
                    </div>
                )}
            </div>
        </div>
    )
}