import "bootstrap/dist/css/bootstrap.min.css";
import navstyles from '../styles/navstyles.module.css'

import Link from "next/link";
import axios from "axios";
import {useEffect, useState} from "react";
export default function UpperBar({redirectionPath, color}) {
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
            //router.push('/login');
        });
    }
    return (
        <div className={`${color} container-fluid px-4 py-3`}>
            <div className={`row justify-content-between`}>
                <div className={`col-5 d-flex justify-content-center`}>
                    <img src="" alt="user logo"/>
                    <div className={`ps-2`}>{name}</div>
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