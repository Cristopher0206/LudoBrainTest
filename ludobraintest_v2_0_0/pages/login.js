import "bootstrap/dist/css/bootstrap.min.css";
import styles from '../styles/styles.module.css'
import navstyles from '../styles/navstyles.module.css'
import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import Link from "next/link";

export default function Login() {
    const router = useRouter();
    /* ESTADOS */
    const [loginUsuario, setLoginUsuario] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false); // estado de la alarma
    /* FUNCIONES */
    const login = () => {
        axios({
            method: "post",
            data: {
                username: loginUsuario,
                password: loginPassword
            },
            withCredentials: true,
            url: "http://localhost:3001/login"
        }).then(res => {
            if (res.data === "Usuario logeado") {
                router.push('/presentacion');
            } else {
                // Si las credenciales son incorrectas, salta una alerta
                setShowAlert(true);
                // La alerta se oculta después de dos segundos
                setTimeout(() => {
                    setShowAlert(false);
                }, 2000);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <div className={`container-fluid`}>
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
                    <h1>LudoBrain-Test</h1>
                </div>
            </div>
            <br/>
            <div className={`row justify-content-center`}>
                <div className={`col-sm-2 col-md-1 d-flex justify-content-center`}>
                    <img src="/images/usuario.png"
                         alt="user icon"
                         className={`${styles.user_logo}`}/>
                </div>
                <div className={`col-8`}>
                    <input type="text"
                           placeholder={`Ingresa tu usuario (correo electrónico)`}
                           onChange={e => setLoginUsuario(e.target.value)}
                           className={`w-100 px-3 py-2 rounded-xl shadow-md border-2 border-opacity-100  
                           text-white ${styles.input_sky_blue}`}/>
                </div>
            </div>
            <br/>
            <div className={`row justify-content-center`}>
                <div className={`col-sm-2 col-md-1 d-flex justify-content-center`}>
                    <img src="/images/llave-de-la-puerta.png"
                         alt="password icon"
                         className={`${styles.password_logo}`}/>
                </div>
                <div className={`col-8`}>
                    <input name={`password`}
                           type="password"
                           onChange={e => setLoginPassword(e.target.value)}
                           className={`w-100 px-3 py-2 rounded-xl shadow-md border-2 border-opacity-100
                           text-white ${styles.input_sky_blue}`}/>
                </div>
            </div>
            <br/>
            {showAlert && (
                <div className="alert alert-danger" role="alert">
                    Credenciales incorrectas. Inténtalo de nuevo.
                </div>
            )}
            <br/>
            <div className={`row justify-content-center`}>
                <div className={`col-5 d-flex`}>
                    <button onClick={login} className={`w-100 px-5 py-2 text-white rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${navstyles.upper_bar_green}`}>
                        Iniciar sesión
                    </button>
                </div>
                <div className={`col-5 d-flex`}>
                    <Link href={`/presentacion`} className={`w-100`}>
                        <button className={`w-100 px-5 py-2 text-white rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${navstyles.upper_bar_green}`}>
                            Jugar como invitado
                        </button>
                    </Link>
                </div>
            </div>
            <br/> <br/>
            <div className={`row d-flex justify-content-center`}>
                <div className="col-12">
                    <Link href={`#`} className={`d-flex justify-content-center`}>
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>
            </div>
            <div className={`row d-flex justify-content-center`}>
                <div className="col-12">
                    <Link href={`/registrarEducador`} className={`d-flex justify-content-center`}>
                        ¿No tienes una cuenta? ¡Regístrate!
                    </Link>
                </div>
            </div>
            <div className={`row d-flex justify-content-center`}>
                <div className="col-12">
                    <Link href={`/registrarEducador`} className={`d-flex justify-content-center`}>
                        Más información
                    </Link>
                </div>
            </div>
        </div>
    )
}