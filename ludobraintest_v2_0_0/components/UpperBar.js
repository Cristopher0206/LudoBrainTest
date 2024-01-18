import "bootstrap/dist/css/bootstrap.min.css";
import navstyles from '../styles/navstyles.module.css'
import Link from "next/link";
import axios from "axios";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function UpperBar({color, questionType}) {
    const router = useRouter();
    /*------------------- ESTADOS -------------------*/
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    /*------------------- EFECTOS -------------------*/
    useEffect(() => { // useEffect para obtener el usuario de la sesión
        getUser();
    }, []);
    /*------------------- FUNCIONES -------------------*/
    const getUser = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/getUser"
        }).then(res => {
            setUserId(res.data.id);
            setUsername(res.data.username);
            setName(res.data.name);
        }).catch(err => {
            console.log(err);
            router.push('/');
        });
    }
    const cerrarSesion = () => {
        const confirmacion = window.confirm('¿Estás seguro que deseas cerrar tu sesión?');
        if(confirmacion){
            router.push('/');
        }
    }
    return (
        <div className={`${color} container-fluid px-4 py-3 shadow-md rounded-b-2xl border-2 border-black border-opacity-10`}>
            <div className={`row justify-content-between`}>
                <div className={`col-4 d-flex justify-content-center p-3`}>
                    <img src="/images/usuario.png"
                         alt="user logo"
                         className={`h-10`}/>
                    <div className={`ps-2 pt-2`}><h5>{name}</h5></div>
                </div>
                <div className={`col-4 d-flex justify-content-center`}>
                    <h4 className={`pt-4 font-medium`}>{questionType}</h4>
                </div>
                <div className={`col-4 d-flex justify-content-center`}>
                    <button onClick={cerrarSesion}
                            className={`py-3 px-5 rounded-2xl w-100 shadow-xl border-2 border-black border-opacity-10
                             ${navstyles.btn_exit}`}>
                        <div className={`p-0`}>Cerrar Sesión</div>
                    </button>
                </div>
            </div>
        </div>
    )
}