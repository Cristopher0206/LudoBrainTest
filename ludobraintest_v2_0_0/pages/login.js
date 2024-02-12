import "bootstrap/dist/css/bootstrap.min.css";
import styles from '@/styles/styles.module.css'
import navstyles from '@/styles/navstyles.module.css'
import button from '@/styles/button.module.css'
import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import Link from "next/link";
import Button from "@/components/Button";
import Swal from "sweetalert2";

export default function Login() {
    const router = useRouter();
    /* ESTADOS */
    const [loginUsuario, setLoginUsuario] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    /* FUNCIONES */
    const login = () => {
        axios({
            method: "post",
            data: {
                username: loginUsuario,
                password: loginPassword
            },
            withCredentials: true,
            url: "http://localhost:3002/login"
        }).then(res => {
            if (res.data === "Usuario logeado") {
                let timerInterval;
                Swal.fire({
                    icon: 'success',
                    title: "¡Acceso Correcto!",
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log("I was closed by the timer");
                    }
                });
                setTimeout(() => {
                    startApp();
                }, 3000);
            } else {
                let timerInterval;
                Swal.fire({
                    icon: 'warning',
                    title: "¡Credenciales incorrectas, inténtalo de nuevo!",
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log("I was closed by the timer");
                    }
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }
    const startApp = () => {
        router.push('/presentacion');
    }

    return (
        <div className={`container-fluid px-5`}>
            <br/><br/>
            <div className={`row d-flex justify-content-between`}>
                <div className={`col-5 d-flex justify-content-center`}>
                    <img src="/images/EPN_logo_big.png"
                         alt="EPN LOGO"
                         className={`${styles.epn_logo}`}/>
                </div>
                <div className={`col-5 d-flex justify-content-center`}>
                    <img src="/images/341894265_1090311248597302_516144097782360263_n.jpg"
                         alt="LUDOLAB LOGO"
                         className={`${styles.ludolab_logo}`}/>
                </div>
            </div>
            <br/><br/>
            <div className={`row`}>
                <div className={`col-12 d-flex justify-content-center`}>
                    <h1>Poli-Quizzes</h1>
                </div>
            </div>
            <br/>
            <div className={`row justify-content-center px-28`}>
                <div className={`col-sm-2 col-md-1 d-flex justify-content-center`}>
                    <img src="/images/usuario.png"
                         alt="user icon"
                         className={`${styles.user_logo}`}/>
                </div>
                <div className={`col-8 self-center  `}>
                    <input type="text"
                           placeholder={`Ingresa tu usuario (correo electrónico)`}
                           onChange={e => setLoginUsuario(e.target.value)}
                           className={`w-100 px-3 py-2 rounded-xl shadow-md border-2 border-opacity-100  
                           text-black text-xl ${styles.input_sky_blue}`}/>
                </div>
            </div>
            <br/>
            <div className={`row justify-content-center px-28`}>
                <div className={`col-sm-2 col-md-1 d-flex justify-content-center`}>
                    <img src="/images/llave-de-la-puerta.png"
                         alt="password icon"
                         className={`${styles.password_logo}`}/>
                </div>
                <div className={`col-8 self-center`}>
                    <input name={`password`}
                           type="password"
                           onChange={e => setLoginPassword(e.target.value)}
                           className={`w-100 px-3 py-2 rounded-xl shadow-md border-2 border-opacity-100
                           text-black text-xl ${styles.input_sky_blue}`}/>
                </div>
            </div>
            <br/> <br/>
            <div className={`row justify-content-center px-40`}>
                <div className={`col-5 flex justify-end`}>
                    <Button text={`Iniciar sesión`} instruction={login} bg_color={button.btn_green}></Button>
                </div>
                <div className={`col-5 flex justify-start`}>
                    <Button text={`Jugar como invitado`} instruction={startApp} bg_color={button.btn_green}></Button>
                </div>
            </div>
            <br/> <br/>
            <div className={`flex justify-center`}>
                <Link href={`/changePassword`}>
                    ¿Olvidaste tu contraseña?
                </Link>
            </div>
            <div className={`flex justify-center`}>
                <Link href={`/registrarEducador`} className={`d-flex justify-content-center`}>
                    ¿No tienes una cuenta? ¡Regístrate!
                </Link>
            </div>
            <div className={`flex justify-center`}>
                <Link href={`/creditos`} className={`d-flex justify-content-center`}>
                    Más información
                </Link>
            </div>
        </div>
    )
}