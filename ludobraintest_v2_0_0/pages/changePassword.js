import InstructionBar from "@/components/InstructionBar";
import styles from "@/styles/styles.module.css";
import navstyles from "@/styles/navstyles.module.css";
import {useRouter} from "next/router";
import axios from "axios";
import {useState} from "react";

export default function ChangePassword() {
    const router = useRouter();
    /*------------------- ESTADOS -------------------*/
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [successMessage, setSuccessMessage] = useState(false); // Estado para el mensaje de registro
    const [warningMessage, setWarningMessage] = useState(false); // Estado para la advertencia de registro
    /*------------------- EFECTOS -------------------*/
    /*------------------- FUNCIONES -------------------*/
    const clearFields = () => { /* Funciòn para limpiar los campos */
        setUsuario('');
        setNombre('');
        setApellido('');
        setPassword('');
    };
    const updateEducador = () => {
        axios({
            method: "post",
            data: {
                usuario: usuario,
                user_password: password,
            },
            withCredentials: true,
            url: "http://localhost:3001/updateEducador"
        }).then(res => {
            console.log(res);
            if (res.data.message === 'Contraseña actualizada exitosamente') {
                // Si el usuario se crea, muestra un mensaje de confirmacion
                setSuccessMessage(true);
                // El mensaje desaparece luego de 3 segundos
                setTimeout(() => {
                    setSuccessMessage(false);
                    router.push('/');
                }, 3000);
            } else {
                // Si el usuario ya existe, muestra un mensaje de advertencia
                setWarningMessage(true);
                // El mensaje desaparece luego de 3 segundos
                setTimeout(() => {
                    setWarningMessage(false);
                }, 3000);
                clearFields();
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <InstructionBar previousPage={`/`}
                            instruction={`¡Regístrate!`}/>
            <br/> <br/> <br/> <br/> <br/> <br/>
            <div className={`container-fluid`}>
                <div className={`row justify-content-center text-black`}>
                    <div className={`col-sm-2 col-lg-1 d-flex justify-content-center`}>
                        <label className={`font-bold ${styles.label_red} ${styles.label}`}>
                            Usuario
                        </label>
                    </div>
                    <div className={`col-sm-9 col-md-8 col-lg-8 d-flex justify-content-center`}>
                        <input value={usuario}
                               type="text"
                               placeholder={`example@gmail.com`}
                               onChange={e => setUsuario(e.target.value)}
                               className={`w-100 px-3 py-2 rounded-xl shadow-md border-2 border-black border-opacity-10  
                           text-black ${styles.input_yellow} ${styles.input_text}`}/>
                    </div>
                </div>
                <br/>
                <div className={`row justify-content-center text-black`}>
                    <div className={`col-sm-2 col-lg-1 d-flex justify-content-center`}>
                        <label className={`font-bold ${styles.label_red} ${styles.label}`}>
                            Nueva Contraseña
                        </label>
                    </div>
                    <div className={`col-sm-9 col-md-8 col-lg-8 d-flex justify-content-center`}>
                        <input value={password}
                               type="password"
                               onChange={e => setPassword(e.target.value)}
                               className={`w-100 px-3 py-2 rounded-xl shadow-md border-2 border-black border-opacity-10  
                           text-black ${styles.input_yellow} ${styles.input_text}`}/>
                    </div>
                </div>
                {successMessage && (
                    <div>
                        <br/>
                        <div className="alert alert-success d-flex justify-content-center" role="alert">
                            ¡Contraseña actualizada Exitosamente!
                        </div>
                    </div>
                )}
                {warningMessage && (
                    <div>
                        <br/>
                        <div className="alert alert-danger d-flex justify-content-center" role="alert">
                            ¡Este usuario no existe!
                        </div>
                    </div>
                )}
                <br/>
                <div className={`d-flex justify-content-center`}>
                    <button onClick={updateEducador} className={`px-5 py-2 text-black rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${navstyles.upper_bar_yellow} ${styles.btn_text}`}>
                        Actualizar Contraseña
                    </button>
                </div>
            </div>
        </main>
    )
}