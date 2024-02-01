import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import navstyles from "@/styles/navstyles.module.css";
import styles from "@/styles/styles.module.css";
import button from "@/styles/button.module.css";
import Button from "@/components/Button";
import {useRouter} from "next/router";
import Swal from "sweetalert2";
import SweetAlert from "sweetalert2";

export default function Modulos() {
    const router = useRouter();
    /*------------------- ESTADOS -------------------*/
    /*------------------- EFECTOS -------------------*/
    /*------------------- FUNCIONES -------------------*/
    const goTest = () => {
        router.push("/select/selectNinio");
    }
    const goCreate = () => {
        router.push("/modulosCreacion");
    }
    const goResults = () => {
        router.push("/resultados");
    }
    const goRegister = () => {
        router.push("/read/readNinio");
    }
    const confirmGetBack = () => {
        SweetAlert.fire({
            title: '¿Estás seguro...?',
            text: "Se cerrará tu sesión actual.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1D4ED8',
            cancelButtonColor: '#E11D48',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                router.push('/');
            }
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar color={navstyles.upper_bar_yellow}/>
            <InstructionBar confirmation={confirmGetBack}
                            instruction={`Selecciona un módulo`}/>
            <div className={`container-fluid`}>
                <div className={`row`}>
                    <div className={`col-6 self-center p-5`}>
                        <div
                            className={`container-fluid px-4 py-5 justify-center self-center italic ${styles.modules_instruction_text}`}>
                            <p>¡Hola, Bienvenido a Poli-Quizzes!</p>
                            <p>Selecciona uno de los cuatro módulos que se encuentran
                                al lado derecho de la pantalla.</p>
                        </div>
                    </div>
                    <div className={`col-6 self-center`}>
                        <br/>
                        <div className={`px-20`}>
                            <Button instruction={goTest} bg_color={button.btn_blue} text={`Evaluar un niño`}></Button>
                        </div>
                        <br/>
                        <div className={`px-20`}>
                            <Button instruction={goCreate} bg_color={button.btn_green}
                                    text={`Administrar Evaluaciones y Preguntas`}></Button>
                        </div>
                        <br/>
                        <div className={`px-20`}>
                            <Button instruction={goRegister} bg_color={button.btn_yellow}
                                    text={`Registrar un niño`}></Button>
                        </div>
                        <br/>
                        <div className={`px-20`}>
                            <Button instruction={goResults} bg_color={button.btn_red} text={`Ver resultados`}></Button>
                        </div>
                        <br/>
                    </div>
                </div>
            </div>
        </main>
    )
}