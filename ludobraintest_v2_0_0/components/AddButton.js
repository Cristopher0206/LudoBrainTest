import Link from "next/link";
import styles from '../styles/styles.module.css'

export default function AddButton({createPage, color}){
    return (
        <div className={`container-fluid d-flex justify-content-center`}>
            <Link href={createPage}>
                <button className={`${color} rounded-full px-3 py-1 font-bold ${styles.plus_btn}`}>
                    <h2>+</h2>
                </button>
            </Link>
        </div>
    )
}