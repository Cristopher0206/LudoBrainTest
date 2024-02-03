import Link from "next/link";
import styles from '@/styles/styles.module.css'
import button from '@/styles/button.module.css'
export default function InstructionBar({instruction, information, info_color, confirmation, voiceCommand, hiddenInfo, hiddenVoice,
                                           silenceCommand}) {
    return (
        <div className={`container-fluid`}>
            <div className={`row p-0 py-4`}>
                <div className={`col-4 d-flex flex-column justify-content-center pt-4`}>
                    <div className={`pt-sm-1 pt-md-2 pt-lg-3 pt-lg-2 flex justify-center text-decoration-none`}>
                        <button onClick={confirmation} className={`rounded-full px-2 py-0 font-bold drop-shadow-lg 
                        border-2 border-opacity-100 ${button.btn_back_arrow}`}>
                            <h2>←</h2>
                        </button>
                    </div>
                    <div className={`flex justify-center`}>
                        <h5 className={`${styles.back}`}>
                            Regresar
                        </h5>
                    </div>
                </div>
                <div className={`col-4 d-flex justify-content-center pt-sm-3 pt-lg-3 pt-xl-4`}>
                <div className={`pt-sm-1 pt-lg-4 pt-xl-3`}>
                        <div className={`py-lg-1 py-xl-0 ${styles.instruction_text}`}>
                            {instruction}
                        </div>
                    </div>
                </div>
                <div className={`col-4 flex justify-center`}>
                    <img src="/images/asistente-de-robot.png"
                         alt="Mini Echo"
                         className={`${styles.echo_logo_ib}`}/>
                    <button onClick={information}
                            className={`mx-2 border-2 border-black border-opacity-25 flex h-fit rounded-full px-3 py-1 ${info_color} 
                    self-center ${hiddenInfo}`}>
                        <div className={`h-fit italic self-center text-xl font-bold`}>
                            i
                        </div>
                    </button>
                    <button onClick={voiceCommand}
                            className={`mx-2 border-2 border-black border-opacity-25 flex h-fit rounded-full px-1 py-1 ${button.btn_speak} 
                    self-center ${hiddenVoice}`}>
                        <div className={`text-xl p-0`}>🔊</div>
                        {/*<h2>🗣️</h2>*/}
                    </button>
                    <button onClick={silenceCommand}
                            className={`mx-2 border-2 border-black border-opacity-25 flex h-fit rounded-full px-1 py-1 ${button.btn_silence} 
                    self-center ${hiddenVoice}`}>
                        <div className={`text-xl p-0`}>🔇</div>
                    </button>
                </div>
            </div>
        </div>
    )
}