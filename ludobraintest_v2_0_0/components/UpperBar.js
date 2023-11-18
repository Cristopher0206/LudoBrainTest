import "bootstrap/dist/css/bootstrap.min.css";
import navstyles from '../styles/navstyles.module.css'
export default function UpperBar(){
    return (
        <div className={`${navstyles.upper_bar} flex flex-col items-end px-4 py-3`}>
            <button className={`py-3 px-5 rounded-2xl ${navstyles.btn_exit}`}>Salir</button>
        </div>
    )
}