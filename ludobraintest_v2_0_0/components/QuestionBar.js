import Link from "next/link";
import styles from '@/styles/styles.module.css'
import button from '@/styles/button.module.css'

export default function QuestionBar({confirmGetBack, nombreTest, labelColor}) {
    return (
        <div className={`container-fluid flex flex-col h-100`}>
            <div className={`pt-sm-1 pt-md-2 pt-lg-0 flex justify-center text-decoration-none`}>
                <button onClick={confirmGetBack} className={`bg-black text-white rounded-full px-2 py-0 font-bold drop-shadow-lg 
                        border-2 border-opacity-100 ${button.btn_back_arrow}`}>
                    <h2>←</h2>
                </button>
            </div>
            <div className={`flex justify-center`}>
                <h5 className={`${styles.back}`}>
                    Regresar
                </h5>
            </div>
            <div className={`flex justify-center h-75`}>
                <div className={`flex self-end`}>
                    <h3 className={labelColor}>
                        {nombreTest}
                    </h3>
                </div>
            </div>
            <div className={`flex justify-center h-75`}>
                <div className={`flex self-end`}>
                    <img src="/images/asistente-de-robot.png"
                         alt="Mini Echo"
                         className={`${styles.echo_logo_ib}`}/>
                </div>
            </div>
        </div>
    )
}