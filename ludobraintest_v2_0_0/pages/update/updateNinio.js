import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import {useEffect, useState} from "react";
import axios from "axios";
import navstyles from "@/styles/navstyles.module.css";
import {useRouter} from "next/router";
import styles from "@/styles/styles.module.css";
import Button from "@/components/Button";
import button from "@/styles/button.module.css";
import Swal from "sweetalert2";

export default function UpdateNinio() {
    const router = useRouter();
    /*------------------- ESTADOS -------------------*/
    const [idNinio, setIdNinio] = useState('');
    const [registerUpdateName, setRegisterUpdateName] = useState('');
    const [registerUpdateAge, setRegisterUpdateAge] = useState('');
    const [info, setInfo] = useState(sessionStorage.getItem("dataToPass"));
    /*------------------- EFECTOS -------------------*/
    useEffect(() => { // useEffect para obtener el usuario de la sesión
        getUser();
        showInstructions();
    }, []);
    /*------------------- FUNCIONES -------------------*/
    const getUser = () => {
        setInfo(sessionStorage.getItem('dataToPass'));
        axios({
            method: "post",
            data: {
                id_ninio: info,
            },
            withCredentials: true,
            url: "http://localhost:3001/getChildrenById"
        }).then(res => {
            setIdNinio(res.data[0].id_ninio);
            setRegisterUpdateName(res.data[0].nombre);
            setRegisterUpdateAge(res.data[0].edad)
        }).catch(err => {
            console.log(err);
        });
    }
    const actualizarNinio = () => { // Actualizar los datos del niño
        if (registerUpdateName === '' || registerUpdateAge === '') {
            Swal.fire({
                icon: 'warning',
                title: "Llena todos los campos para continuar",
                confirmButtonText: "<div class='text-amber-950'>¡De acuerdo!<div>",
                confirmButtonColor: "rgba(246, 218, 39, 0.75)",
            }).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                console.log(err);
            })
        } else if (registerUpdateAge <= 1) {
            Swal.fire({
                icon: 'warning',
                title: "El niño debe tener mínimo 2 años",
                confirmButtonText: "<div class='text-amber-950'>¡De acuerdo!<div>",
                confirmButtonColor: "rgba(246, 218, 39, 0.75)",
            }).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                console.log(err);
            })
        } else if (registerUpdateAge >= 8) {
            Swal.fire({
                icon: 'warning',
                title: "El niño debe tener máximo 7 años",
                confirmButtonText: "<div class='text-amber-950'>¡De acuerdo!<div>",
                confirmButtonColor: "rgba(246, 218, 39, 0.75)",
            }).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                console.log(err);
            })
        } else {
            axios({
                method: "post",
                data: {
                    id_ninio: idNinio,
                    nombre: registerUpdateName,
                    edad: registerUpdateAge,
                },
                withCredentials: true,
                url: "http://localhost:3001/updateChildren"
            }).then(res => {
                console.log(res);
                if (res.data.message === 'Niño actualizado exitosamente') {
                    let timerInterval;
                    Swal.fire({
                        icon: 'success',
                        title: "¡Niño actualizado Correctamente!",
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
                        router.push('/read/readNinio');
                    }, 3000);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    const confirmGetBack = () => {
        Swal.fire({
            title: '¿Estás seguro que quieres regresar?',
            text: "¡Todos los cambios se perderán!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'rgba(255,67,49)',
            cancelButtonColor: '#9CA3AF',
            confirmButtonText: 'Sí, quiero regresar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                router.push('/read/readNinio');
            }
        })
    }
    const showInstructions = () => {
        Swal.fire({
            icon: "info",
            html: "<div>\n" +
                "                <h5>Paso 1</h5>\n" +
                "                <p> Actualiza el nombre y el apellido del niño" +
                "                <h5>Paso 2</h5>\n" +
                "                <p> Actualiza la edad del niño" +
                "                <h5>Paso 3</h5>\n" +
                "                <p> Dale clic en el botón <strong>\"Actualizar Niño\"</strong> para finalizar el" +
                "                 proceso de actualización de datos</p>   " +
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
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar color={navstyles.upper_bar_yellow}/>
            <InstructionBar confirmation={confirmGetBack}
                            instruction={`Actualiza a un niño`}
                            information={showInstructions}
                            info_color={button.btn_yellow}/>
            <div className={`container-fluid text-black px-5`}>
                <br/>
                <div className={`row justify-content-center px-5`}>
                    <div className={`col-sm-2 col-lg-1 flex justify-end self-center`}>
                        <label className={`font-bold ${styles.label_red} ${styles.label}`}>
                            Nombre
                        </label>
                    </div>
                    <div className={`col-sm-9 col-md-8 col-lg-8 flex justify-center self-center`}>
                        <input value={registerUpdateName}
                               type="text"
                               onChange={e => setRegisterUpdateName(e.target.value)}
                               className={`w-100 px-3 py-2 rounded-xl shadow-md border-2 border-black border-opacity-10  
                           text-black ${styles.input_yellow} ${styles.input_text}`}/>
                    </div>
                </div>
                <br/>
                <div className={`row justify-content-center px-5`}>
                    <div className={`col-sm-2 col-lg-1 flex justify-end self-center`}>
                        <label className={`font-bold ${styles.label_red} ${styles.label}`}>
                            Edad
                        </label>
                    </div>
                    <div className={`col-sm-9 col-md-8 col-lg-8 flex justify-center self-center`}>
                        <input value={registerUpdateAge}
                               type="number"
                               onChange={e => setRegisterUpdateAge(e.target.value)}
                               className={`w-100 px-3 py-2 rounded-xl shadow-md border-2 border-black border-opacity-10  
                           text-black ${styles.input_yellow} ${styles.input_text}`}/>
                    </div>
                </div>
                <br/>
                <br/>
                <div className={`flex justify-center`}>
                    <div className={`w-25`}>
                        <Button text={`Actualizar Niño`} instruction={actualizarNinio}
                                bg_color={button.btn_yellow}></Button>
                    </div>
                </div>
                <br/>
            </div>
        </main>
    )
}