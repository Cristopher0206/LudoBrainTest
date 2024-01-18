import UpperBar from "@/components/UpperBar";
import sections from "@/styles/upperBarSectionColors.module.css";
import navstyles from "@/styles/navstyles.module.css";
import InstructionBar from "@/components/InstructionBar";
import styles from "@/styles/styles.module.css";
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
            url: 'http://localhost:3001/finishTest',
        }).then(res => {
            console.log(res.data);;
            router.push(`/modulos`);
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar redirectionPath={`/`}
                      color={navstyles.upper_bar_skyblue}></UpperBar>
            <InstructionBar previousPage={`/modulos`}
                            instruction={`¡Terminaste el Test! \n Este es tu puntaje`}/>
            <div className={`container-fluid d-flex justify-content-center`}>
                <h1>{puntaje}</h1>
            </div>
            <br/>
            <div className={`d-flex justify-content-center`}>
                <button onClick={finishTest} className={`px-5 py-2 text-black rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${navstyles.upper_bar_skyblue} ${styles.btn_text}`}>
                    Finalizar Test
                </button>
            </div>
        </main>
    )
}