import "bootstrap/dist/css/bootstrap.min.css";
import styles from '@/styles/styles.module.css'
import button from '@/styles/button.module.css'
import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import Link from "next/link";
import Button from "@/components/Button";
import Swal from "sweetalert2";
import Image from "next/image";

export default function Login() {
    const router = useRouter();
    const path = process.env.REACT_APP_BACKEND_URL;
    const backEndPort = process.env.REACT_APP_BACKEND_PORT;
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
            url: "http://poliquizzes.com:3001/login"
        }).then(res => {
            if (res.data === "Usuario logeado") {
                let timerInterval;
                Swal.fire({
                    icon: 'success',
                    title: "¡Acceso Correcto!",
                    timer: 3000,
                    timerProgressBar: true,
                    allowOutsideClick: false,
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
                    allowOutsideClick: false,
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
            console.log("Error al iniciar sesión");
            console.log(err);
        });
    }
    const startApp = () => {
        router.push('/presentacion')
            .then(r => console.log('Redirigiendo...'));
    }

    const loginAsGuest = () => {
        axios({
            method: "post",
            data: {
                username: 'invitado@hotmail.com',
                password: 'invitado123'
            },
            withCredentials: true,
            url: `http://3.134.64.181:3001/login`
        }).then(res => {
            if (res.data === "Usuario logeado") {
                let timerInterval;
                Swal.fire({
                    icon: 'success',
                    title: "¡Acceso Correcto!",
                    timer: 3000,
                    timerProgressBar: true,
                    allowOutsideClick: false,
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
            }
        }).catch(err => {
            console.log("Error al iniciar sesión de Invitado");
            console.log(err);
        });
    }

    return (
        <div className={`container-fluid px-5`}>
            <br/>
            <div className={`row d-flex justify-content-between`}>
                <div className={`col-5 d-flex justify-content-center`}>
                    <Image src="/images/EPN_logo_big.png"
                           alt="EPN LOGO"
                           className={`${styles.epn_logo}`} width={500} height={500}/>
                </div>
                <div className={`col-5 d-flex justify-content-center`}>
                    <Image src="/images/LudoLab.png"
                           alt="LUDOLAB LOGO"
                           className={`${styles.ludolab_logo}`} width={900} height={90}/>
                </div>
            </div>
            <br/><br/>
            <div className={`row`}>
                <div className={`col-6`}>
                    <div className={`container-fluid`}>
                        <div className={`row justify-content-center px-28`}>
                            <div className={`col-sm-2 col-md-1 d-flex justify-content-center`}>
                                <Image src="/images/usuario.png"
                                       alt="user icon"
                                       className={`${styles.user_logo}`} width={100} height={100}/>
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
                                <Image src="/images/llave-de-la-puerta.png"
                                       alt="password icon"
                                       className={`${styles.password_logo}`} width={100} height={100}/>
                            </div>
                            <div className={`col-8 self-center`}>
                                <input name={`password`}
                                       type="password"
                                       onChange={e => setLoginPassword(e.target.value)}
                                       className={`w-100 px-3 py-2 rounded-xl shadow-md border-2 border-opacity-100
                           text-black text-xl ${styles.input_sky_blue}`}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`col-6 d-flex justify-content-center`}>
                    <Image src="/images/logo_entrenaTuMente2.png"
                           alt="Logo de Entrena Tu Mente" width={500} height={50}/>
                </div>
            </div>
            <br/> <br/>
            <div className={`row justify-content-center px-40`}>
                <div className={`col-5 flex justify-end`}>
                    <Button text={`Iniciar sesión`} instruction={login} bg_color={button.btn_green}></Button>
                </div>
                <div className={`col-5 flex justify-start`}>
                    <Button text={`Jugar como invitado`} instruction={loginAsGuest}
                            bg_color={button.btn_green}></Button>
                </div>
            </div>
            <br/> <br/>
            <div className={`flex justify-center`}>
                <Link href={`/changePassword`} className={`text-decoration-none text-black hover:font-bold text-lg`}>
                    ¿Olvidaste tu contraseña?
                </Link>
            </div>
            <div className={`flex justify-center`}>
                <Link href={`/registrarEducador`} className={`text-decoration-none text-black hover:font-bold text-lg`}>
                    ¿No tienes una cuenta? ¡Regístrate!
                </Link>
            </div>
            <div className={`flex justify-center`}>
                <Link href={`/creditos`} className={`text-decoration-none text-black hover:font-bold text-lg`}>
                    Acerca de
                </Link>
            </div>
        </div>
    )
}