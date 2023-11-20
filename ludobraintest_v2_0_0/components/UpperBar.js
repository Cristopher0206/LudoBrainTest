import "bootstrap/dist/css/bootstrap.min.css";
import navstyles from '../styles/navstyles.module.css'

import Link from "next/link";
export default function UpperBar({redirectionPath, username}) {
    return (
        <div className={`${navstyles.upper_bar} container-fluid px-4 py-3`}>
            <div className={`row justify-content-between`}>
                <div className={`col-5 d-flex justify-content-center`}>
                    <img src="" alt="user logo"/>
                    <div className={`ps-2`}>{username}</div>
                </div>
                <div className={`col-5 d-flex justify-content-end`}>
                    <Link href={redirectionPath}>
                        <button className={`py-3 px-5 rounded-2xl ${navstyles.btn_exit}`}>Salir</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}