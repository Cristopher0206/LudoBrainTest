import Link from "next/link";
import styles from '../styles/styles.module.css'
export default function QuestionBar({previousPage}){
    return (
        <div className={`container-fluid`}>
            <div className={`row p-0 py-4`}>
                <div className={`col-4 d-flex justify-content-center pt-4`}>
                    <Link href={previousPage} className={`pt-sm-1 pt-md-2 pt-lg-3 pt-lg-2`}>
                        <button className={`bg-black text-white rounded-full px-2 py-0 font-bold drop-shadow-lg 
                        border-2 border-opacity-100`}>
                            <h2>←</h2>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}