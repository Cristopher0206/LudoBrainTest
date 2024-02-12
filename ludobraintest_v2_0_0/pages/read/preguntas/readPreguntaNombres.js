import axios from "axios";
import {useEffect, useState} from "react";
import sections from "@/styles/upperBarSectionColors.module.css";
import styles from "@/styles/styles.module.css";
import UpperBar from "@/components/UpperBar";
import QuestionBar from "@/components/QuestionBar";
import {useRouter} from "next/router";
import Swal from "sweetalert2";

export default function ReadPreguntaNombres() {
    const router = useRouter();
    const id_test = localStorage.getItem('id_test');
    const nombre_test = localStorage.getItem('nombre_test');
    let arregloPreguntas;
    /*------------------- ESTADOS -------------------*/
    const [questions, setQuestions] = useState([]);
    const [samples, setSamples] = useState([]);
    const [preguntaActual, setPreguntaActual] = useState('');
    const [totalPreguntas, setTotalPreguntas] = useState(0); // Estado para el total de preguntas
    const [preguntaActualIndex, setPreguntaActualIndex] = useState(1); // Estado para el índice de la pregunta actual
    const [puntaje, setPuntaje] = useState(0); // Estado para el puntaje final
    /*------------------- EFECTOS -------------------*/
    useEffect(() => { // useEffect para obtener el usuario de la sesión
        getQuestionsbyTestId();
    }, []);
    useEffect(() => {
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
            url: 'http://localhost:3002/getQuestionsbyTestId',
        }).then(res => {
            setQuestions(res.data);
            arregloPreguntas = res.data;
            setTotalPreguntas(res.data.length);
            if (arregloPreguntas.length > 0) {
                const firstQuestionId = res.data[0].id_pregunta;
                getSamplesByQuestionId(firstQuestionId);
            }
        }).catch(err => {
            console.log(err);
        });
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
                      color={sections.nombres}></UpperBar>
            <br/>
            <div className={`container-fluid px-5`}>
                <div className={`row`}>
                    <div className={`col-sm-3 col-lg-2`}>
                        <QuestionBar confirmGetBack={confirmGetBack}></QuestionBar>
                    </div>
                    <div className={`col-sm-3 col-lg-3 pt-0`}>
                        <div className={`border-1 border-black rounded-2xl bg-white px-5 py-5
                        flex-col justify-center shadow-inner`}>
                            <p className={`font-bold flex justify-center`}>
                                Nombra la imagen que aparece a continuación
                            </p>
                        </div>
                        <br/> <br/>
                        <button onClick={() => verifyAnswer(0)}
                                className={`w-100 ${styles.incorrect_btn}`}>
                            Incorrecto
                        </button>
                        <br/> <br/>
                        <button onClick={() => verifyAnswer(1)}
                                className={`w-100 ${styles.correct_btn}`}>
                            Correcto
                        </button>
                    </div>
                    <div className={`col-5 pt-0`}>
                        <h5>
                            Pregunta {preguntaActualIndex} / {totalPreguntas}
                        </h5>
                        <div className={`grid grid-cols-1 h-100`}>
                            {samples.map((sample, index) => (
                                <div key={index} className={`border-1 border-black rounded-2xl bg-white px-4 py-4
                        flex justify-center shadow-inner h-100`}>
                                    <img src={`/images/${sample.imagen}`} alt={`${sample.imagen}`}
                                         className={`img-fluid`}/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={`col-lg-2 flex self-center`}>
                        <h3 className={`${styles.label_electric_blue}`}>
                            {nombre_test}
                        </h3>
                    </div>
                </div>
            </div>
            <br/> <br/>
        </div>
    )
}