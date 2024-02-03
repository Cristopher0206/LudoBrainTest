import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import Button from "@/components/Button";
import styles from "@/styles/styles.module.css";
import navstyles from "@/styles/navstyles.module.css";
import button from "@/styles/button.module.css";
import {useRouter} from "next/router";
import axios from "axios";
import UseSpeechSynthesis from "@/pages/useSpeechSynthesis";
import useVoiceReader from "@/pages/useVoiceReader";
import {useState} from "react";

export default function PuntajeFinal() {
    const router = useRouter();
    const puntaje = localStorage.getItem('puntaje');
    const { speak, speaking } = UseSpeechSynthesis();
    /*------------------- ESTADOS -------------------*/
    const [isSpeaking, setIsSpeaking] = useState(false);
    /*------------------- EFECTOS -------------------*/
    const text = "¡Felicitaciones! Completaste la Evaluación. Tu puntuación final es " + puntaje;
    useVoiceReader(text, isSpeaking);
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
            console.log(res.data);
            router.push(`/menuOpcionesTest`).then(r => console.log(r));
            shutUp();
        }).catch(err => {
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
            <UpperBar color={navstyles.upper_bar_skyblue}/>
            <InstructionBar previousPage={`#`}
                            instruction={`Observa la puntuación final`}
                            hiddenInfo={`hidden`}
                            voiceCommand={hearVoice}
                            silenceCommand={shutUp}/>
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