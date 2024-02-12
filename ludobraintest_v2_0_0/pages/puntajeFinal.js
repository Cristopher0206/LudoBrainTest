import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import Button from "@/components/Button";
import styles from "@/styles/styles.module.css";
import navstyles from "@/styles/navstyles.module.css";
import button from "@/styles/button.module.css";
import {useRouter} from "next/router";
import axios from "axios";

export default function PuntajeFinal() {
    const router = useRouter();
    const puntaje = localStorage.getItem('puntaje');
    /*------------------- ESTADOS -------------------*/
    /*------------------- EFECTOS -------------------*/
    /*------------------- FUNCIONES -------------------*/
    const finishTest = () => {
        axios({
            method: 'post',
            data: {
                id_test: localStorage.getItem('id_test'),
                id_ninio: localStorage.getItem('id_ninio'),
                puntaje: puntaje,
            },
            withCredentials: true,
            url: 'http://localhost:3002/finishTest',
        }).then(res => {
            console.log(res.data);
            router.push(`/menuOpcionesTest`);
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar redirectionPath={`/`}
                      color={navstyles.upper_bar_skyblue}></UpperBar>
            <InstructionBar previousPage={`#`}
                            instruction={`Observa la puntuación final`}/>
            <br/>
            <div className={`container-fluid flex flex-col justify-center`}>
                <div className={`row ${styles.test_info} self-center`}>
                    <h2 className={`font-bold`}>¡Felicitaciones!</h2>
                    <div className={`text-3xl italic`}>
                        Completaste la Evaluación
                    </div>
                    <br/> <br/> <br/>
                    <h2 className={`font-bold`}>Tu puntuación final es</h2>
                    <div className={`text-3xl italic`}>
                        {puntaje}
                    </div>
                </div>
            </div>
            <br/><br/>
            <div className={`flex justify-center`}>
                <div className={`${styles.div_btn}`}>
                    <Button text={`Finalizar Sesión de Evaluación`}
                            instruction={finishTest}
                            bg_color={button.btn_blue}/>
                </div>
            </div>
        </main>
    )
}