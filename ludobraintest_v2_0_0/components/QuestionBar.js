import Link from "next/link";
import styles from '../styles/styles.module.css'

export default function QuestionBar({previousPage}) {
    return (
        <div className={`container-fluid`}>
            <br/>
            <div className={`d-flex justify-content-center`}>
                <Link href={previousPage} className={`pt-sm-1 pt-md-2 pt-lg-0`}>
                    <button className={`bg-black text-white rounded-full px-2 py-0 font-bold drop-shadow-lg 
                        border-2 border-opacity-100`}>
                        <h2>←</h2>
                    </button>
                </Link>
            </div>
            <br/> <br/>
            <div className={`d-flex justify-content-center`}>
                <img src="/images/asistente-de-robot.png"
                     alt="Mini Echo"
                     className={`${styles.echo_logo_ib}`}/>
            </div>
        </div>
    )
}