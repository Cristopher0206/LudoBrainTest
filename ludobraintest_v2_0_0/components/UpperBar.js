import "bootstrap/dist/css/bootstrap.min.css";
import navstyles from '@/styles/navstyles.module.css'
import button from '@/styles/button.module.css'
import axios from "axios";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Button from "@/components/Button";
import SweetAlert from "sweetalert2";

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
        SweetAlert.fire({
            title: '¿Estás seguro...?',
            text: "Se cerrará tu sesión actual.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1D4ED8',
            cancelButtonColor: '#E11D48',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                router.push('/');
            }
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <div className={`${color} container-fluid px-4 py-3 shadow-md rounded-b-2xl border-2 border-black border-opacity-10`}>
            <div className={`row justify-content-between`}>
                <div className={`col-4 d-flex justify-content-center p-3`}>
                    {/*<img src="/images/usuario.png"
                         alt="user logo"
                         className={`h-10`}/>*/}
                    <div className={`ps-2 pt-2`}>
                        <h5>¡Bienvenido, {name}!</h5>
                    </div>
                </div>
                <div className={`col-4 d-flex justify-content-center`}>
                    <h4 className={`pt-4 font-medium`}>{questionType}</h4>
                </div>
                <div className={`col-4 d-flex justify-content-center pt-2`}>
                    <Button text={`Cerrar Sesión`} bg_color={button.btn_black} instruction={cerrarSesion}></Button>
                </div>
            </div>
        </div>
    )
}