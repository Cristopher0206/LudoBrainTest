import UpperBar from "@/components/UpperBar";
import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";

export default function Login() {
    /* Estados */
    const [loginUsuario, setLoginUsuario] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    //useState para el estado de la alarma
    const [showAlert, setShowAlert] = useState(false);

    const router = useRouter();

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
                console.log("BIENVENIDOOOOOOOOO");
                //router.push('/modulos');
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
        <div className={`container-fluid border-2 border-black`}>
            <br/>
            <div className={`row d-flex justify-content-between`}>
                <div className={`col-5 d-flex justify-content-center`}>
                    <img src="" alt="EPN LOGO"/>
                </div>
                <div className={`col-5 d-flex justify-content-center`}>
                    <img src="" alt="LUDOLAB LOGO"/>
                </div>
            </div>
            <br/>
            <div className={`row`}>
                <div className={`col-12 d-flex justify-content-center`}>
                    <h1>LudoBrain-Test</h1>
                </div>
            </div>
            <br/>
            <div className={`row`}>
                <div className={`col-6 d-flex justify-content-center`}>
                    <img src="" alt="user icon"/>
                </div>
                <div className={`col-6`}>
                    <input name={`usuario`}
                           type="text"
                        /*placeholder={`Ingresa tu usuario (correo electrónico)`}*/
                           onChange={e => setLoginUsuario(e.target.value)}
                           className={`w-100`}/>
                </div>
            </div>
            <br/>
            <div className={`row`}>
                <div className={`col-6 d-flex justify-content-center`}>
                    <img src="" alt="password icon"/>
                </div>
                <div className={`col-6`}>
                    <input name={`password`}
                           type="password"
                           onChange={e => setLoginPassword(e.target.value)}
                           className={`w-100`}/>
                </div>
            </div>
            <br/>
            {showAlert && (
                <div className="alert alert-danger" role="alert">
                    Credenciales incorrectas. Inténtalo de nuevo.
                </div>
            )}
            <div className={`row justify-content-evenly`}>
                <div className={`col-5 p-0 d-flex justify-content-center`}>
                    <button type="button" onClick={login} className={`btn btn-success w-100`}>
                        Iniciar sesión
                    </button>
                </div>
                <div className={`col-5 p-0 d-flex justify-content-center`}>
                    <button className={`btn btn-success w-100`}>
                        Jugar como invitado
                    </button>
                </div>
            </div>
            <br/>
        </div>
    )
}