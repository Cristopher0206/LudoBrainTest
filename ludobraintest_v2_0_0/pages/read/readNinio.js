import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import navstyles from "@/styles/navstyles.module.css";
import styles from "@/styles/styles.module.css";
import button from "@/styles/button.module.css";
import AddButton from "@/components/AddButton";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import UseSpeechSynthesis from "@/pages/useSpeechSynthesis";
import useVoiceReader from "@/pages/useVoiceReader";

export default function ReadNinio() {
    const router = useRouter();
    const { speak, speaking } = UseSpeechSynthesis();
    /*------------------- ESTADOS -------------------*/
    const [children, setChildren] = useState([]);
    const [isSpeaking, setIsSpeaking] = useState(false);
    /*------------------- EFECTOS -------------------*/
    useEffect(() => { // useEffect para obtener el usuario de la sesión
        getNinios();
        showInstructions();
    }, []);
    const text = "¡Bienvenido al Módulo de Registro! Aquí podrás ver la lista de Niños que has registrado. Dale clic al botón con el símbolo " +
        "\"más\" que se encuentra en la parte superior central de la pantalla para registrar un nuevo niño. ";
    useVoiceReader(text, isSpeaking);
    /*------------------- FUNCIONES -------------------*/
    const getNinios = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/getChildren"
        }).then((res) => {
            if (res.data) {
                setChildren(res.data); // Establece el estado con los resultados
                console.log(res);
            } else {
                console.error("No existe información", res);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const eliminarNinio = (idNinio) => {
        Swal.fire({
            title: '¿Estás seguro que deseas eliminar del registro a este Niño?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'rgba(255,67,49)',
            cancelButtonColor: '#9CA3AF',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                axios({
                    method: "post",
                    data: {
                        id_ninio: idNinio,
                    },
                    withCredentials: true,
                    url: "http://localhost:3001/deleteChild"
                }).then((res) => {
                    console.log(res);
                    if (res.data.message === 'Niño eliminado exitosamente') {
                        let timerInterval;
                        Swal.fire({
                            icon: 'success',
                            title: "¡Niño eliminado del registro Correctamente!",
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
                        setTimeout(() => {
                            getNinios();
                        }, 3000);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const goActualizarNinio = (idNinio) => {
        sessionStorage.setItem('dataToPass', idNinio);
        router.push('../update/updateNinio').then(r => console.log(r));
        shutUp();
    }
    const goCreateNinio = () => {
        router.push('/create/createNinio').then(r => console.log(r));
        shutUp();
    }
    const confirmGetBack = () => {
        router.push('/modulos').then(r => console.log(r));
        shutUp();
    }
    const showInstructions = () => {
        Swal.fire({
            icon: "info",
            title: "Bienvenido al Módulo de Registro",
            html: "<div>\n" +
                "                <p>En la parte inferior de la pantalla encontrarás la lista de <strong>Niños</strong>\n" +
                "                    ques has registrado.</p>\n" +
                "                <p>Para <strong>Registrar un niño</strong>, dale clic al botón con el símbolo\n" +
                "                    <strong>+</strong> que se encuentra en la parte superior central de la pantalla.</p>\n" +
                "                <p>Para <strong>Actualizar la información de un Niño</strong>, dale clic al botón con el\n" +
                "                    símbolo <strong>✏️</strong> que se encuentra al lado derecho de cada tarjeta.</p>\n" +
                "                <p>Para <strong>Eliminar el registro de un Niño</strong>, dale clic al botón con el\n" +
                "                    símbolo <strong>🗑️</strong> que se encuentra al lado derecho de cada tarjeta.</p>\n" +
                "            </div>",
            confirmButtonText: "<div class='text-amber-950'>¡De acuerdo!<div>",
            confirmButtonColor: "rgba(246, 218, 39, 0.75)",
            footer: "Puedes volver a ver estas instrucciones dando clic en el botón de información en la parte " +
                "superior derecha de la pantalla",
        }).then((result) => {
            console.log("result", result);
        }).catch((err) => {
            console.log(err);
        })
    }
    const hearVoice = () => {
        if (isSpeaking === false) {
            setIsSpeaking(true);
            if (!speaking) {
                do {
                    speak(text);
                } while (isSpeaking);
            }
        }
    };
    const shutUp = () => {
        if (isSpeaking === true) {
            setIsSpeaking(false);
        }
    }
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar color={navstyles.upper_bar_yellow}
                      silenceVoice={shutUp}/>
            <InstructionBar confirmation={confirmGetBack}
                            instruction={`Registra un niño`}
                            information={showInstructions}
                            info_color={button.btn_yellow}
                            voiceCommand={hearVoice}
                            silenceCommand={shutUp}/>
            <AddButton createPage={goCreateNinio}
                       color={button.btn_yellow}/>
            <br/>
            <div className={`px-32`}>
                <div className={`container-fluid border-1 border-black shadow-md rounded-2xl bg-white
                        ${styles.overflow_container_children}`}>
                    <br/>
                    {children.map((child, index) => (
                        <div key={index} className={`row justify-content-center`}>
                            <div className={`col-9`}>
                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_yellow}`}>
                                    <div className={`card-body`}>
                                        <div className={`container-fluid`}>
                                            <div className={`row justify-content-between`}>
                                                <div className={`col-sm-4 col-lg-4`}>
                                                    <div
                                                        className={`font-semibold card-title pt-sm-1 pt-md-1 ${styles.child_data}`}>
                                                        {child.nombre}
                                                    </div>
                                                </div>
                                                <div className={`col-sm-4 col-lg-6 d-flex justify-content-center`}>
                                                    <div className={`font-semibold card-title ps-sm-1 pt-sm-4 pt-md-3 
                                                    ${styles.child_data}`}>
                                                        {child.edad} años
                                                    </div>
                                                </div>
                                                <div className={`col-sm-4 col-lg-2 d-flex justify-content-around`}>
                                                    <button onClick={() => eliminarNinio(child.id_ninio)}>
                                                        <img src="/images/eliminar.png" alt="trashIcon"
                                                             className={`${styles.manage_icon}`}/>
                                                    </button>
                                                    <button onClick={() => goActualizarNinio(child.id_ninio)}>
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
        </main>
    )
}