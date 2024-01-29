import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import Link from "next/link";
import navstyles from "@/styles/navstyles.module.css";
import styles from "@/styles/styles.module.css";
import button from "@/styles/button.module.css";
import Button from "@/components/Button";
import {useRouter} from "next/router";

export default function Modulos(){
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
    return(
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar redirectionPath={`/`}
                      color={navstyles.upper_bar_yellow}/>
            <InstructionBar previousPage={`/`}
                            instruction={`Selecciona un módulo`}/>
            <div className={`container-fluid`}>
                <div className={`row`}>
                    <div className={`col-6 flex`}>
                        <div className={`self-center p-5`}>
                            <div className={`container-fluid px-4 py-5 justify-center self-center italic ${styles.modules_instruction_text}`}>
                                <p>¡Hola, Bienvenido a Poli-Quizzes!</p>
                                <p>Selecciona uno de los cuatro módulos que se encuentran
                                    al lado derecho de la pantalla.</p>
                            </div>
                        </div>
                    </div>
                    <div className={`col-6`}>
                        <br/>
                        <div className={`px-20`}>
                            <Button instruction={goTest} bg_color={button.btn_blue} text={`Evaluar un niño`}></Button>
                        </div>
                        <br/>
                        <div className={`px-20`}>
                            <Button instruction={goCreate} bg_color={button.btn_green} text={`Crear Evaluaciones y Preguntas`}></Button>
                        </div>
                        <br/>
                        <div className={`px-20`}>
                            <Button instruction={goRegister} bg_color={button.btn_yellow} text={`Registrar un niño`}></Button>
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