import Link from "next/link";
import styles from '../styles/styles.module.css'
export default function InstructionBar({previousPage, instruction}){
    return (
        <div className={`container-fluid`}>
            <div className={`row p-0 py-4`}>
                <div className={`col-4 d-flex flex-column justify-content-center pt-4`}>
                    <Link href={previousPage} className={`pt-sm-1 pt-md-2 pt-lg-3 pt-lg-2 flex justify-center text-decoration-none`}>
                        <button className={`bg-black text-white rounded-full px-2 py-0 font-bold drop-shadow-lg 
                        border-2 border-opacity-100`}>
                            <h2>←</h2>
                        </button>
                    </Link>
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
                <div className={`col-4 d-flex justify-content-center`}>
                    <img src="/images/asistente-de-robot.png"
                         alt="Mini Echo"
                         className={`${styles.echo_logo_ib}`}/>
                </div>
            </div>
        </div>
    )
}