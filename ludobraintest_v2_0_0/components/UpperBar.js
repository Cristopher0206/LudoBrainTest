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
        <div className={`${color} container-fluid px-4 py-3`}>
            <div className={`row justify-content-between`}>
                <div className={`col-4 d-flex justify-content-center`}>
                    <img src="" alt="user logo"/>
                    <div className={`ps-2`}>{name}</div>
                </div>
                <div className={`col-4 d-flex justify-content-center`}>
                    <div className={`ps-2`}>{questionType}</div>
                </div>
                <div className={`col-4 d-flex justify-content-end`}>
                    <button onClick={cerrarSesion}
                            className={`py-3 px-5 rounded-2xl ${navstyles.btn_exit}`}>
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    )
}