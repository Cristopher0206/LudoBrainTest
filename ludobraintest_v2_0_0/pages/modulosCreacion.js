import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import Link from "next/link";
import navstyles from '@/styles/navstyles.module.css'
import styles from '@/styles/styles.module.css'
import button from '@/styles/button.module.css'
import {useRouter} from "next/router";
import Button from "@/components/Button";

export default function ModulosCreacion() {
    const router = useRouter();
    /*------------------- ESTADOS -------------------*/
    /*------------------- EFECTOS -------------------*/
    /*------------------- FUNCIONES -------------------*/
    const goCreateTest = () => {
        router.push("/read/readTest");
    }
    const goCreateQuestion = () => {
        router.push("/read/readPregunta");
    }
    const confirmGetBack = () => {
        router.push('/modulos');
    }
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar color={navstyles.upper_bar_green}/>
            <InstructionBar confirmation={confirmGetBack}
                            previousPage={`/modulos`}
                            instruction={`¿Qué quieres hacer?`}/>
            <div className={`container-fluid`}>
                <div className={`row`}>
                    <div className={`col-6 self-center p-5`}>
                        <div
                            className={`container-fluid px-4 py-5 justify-center self-center italic ${styles.modules_instruction_text}`}>
                            <p>¡Bienvenido al módulo de <strong>Administración</strong>!</p>
                            <p>Selecciona uno de los dos módulos que se encuentran
                                al lado derecho de la pantalla.</p>
                        </div>
                    </div>
                    <div className={`col-6 self-center`}>
                        <div className={`px-20`}>
                            <Button text={`Administrar Evaluaciones`}
                                    instruction={goCreateTest}
                                    bg_color={button.btn_green}/>
                        </div>
                        <br/>
                        <div className={`px-20`}>
                            <Button text={`Administrar Preguntas`}
                                    instruction={goCreateQuestion}
                                    bg_color={button.btn_red}/>
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        </main>
    )
}