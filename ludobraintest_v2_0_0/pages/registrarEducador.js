import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import InstructionBar from "@/components/InstructionBar";
import navstyles from "@/styles/navstyles.module.css";
import UpperBar from "@/components/UpperBar";
import styles from "@/styles/styles.module.css";

export default function RegistrarEducador() {
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
    const registrarEducador = () => {
        axios({
            method: "post",
            data: {
                usuario: usuario,
                user_password: password,
                nombre: nombre,
                apellido: apellido,
            },
            withCredentials: true,
            url: "http://localhost:3001/registrarEducador"
        }).then(res => {
            console.log(res);
            if (res.data.message === 'Usuario creado correctamente') {
                // Si el usuario se crea, muestra un mensaje de confirmacion
                setSuccessMessage(true);
                // El mensaje desaparece luego de 3 segundos
                setTimeout(() => {
                    setSuccessMessage(false);
                    router.push('/');
                }, 3000);
            } else if (res.data.message === 'El usuario ya se encuentra registrado') {
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
            <br/> <br/>
            <div className={`container-fluid`}>
                <div className={`row justify-content-center text-black`}>
                    <div className={`col-sm-2 col-lg-1 d-flex justify-content-center`}>
                        <label className={`font-bold ${styles.label_red} ${styles.label}`}>
                            Nombre
                        </label>
                    </div>
                    <div className={`col-sm-9 col-md-8 col-lg-8 d-flex justify-content-center`}>
                        <input value={nombre}
                               type="text"
                               onChange={e => setNombre(e.target.value)}
                               className={`w-100 px-3 py-2 rounded-xl shadow-md border-2 border-black border-opacity-10  
                           text-black ${styles.input_yellow} ${styles.input_text}`}/>
                    </div>
                </div>
                <br/>
                <div className={`row justify-content-center text-black`}>
                    <div className={`col-sm-2 col-lg-1 d-flex justify-content-center`}>
                        <label className={`font-bold ${styles.label_red} ${styles.label}`}>
                            Apellido
                        </label>
                    </div>
                    <div className={`col-sm-9 col-md-8 col-lg-8 d-flex justify-content-center`}>
                        <input value={apellido}
                               type="text"
                               onChange={e => setApellido(e.target.value)}
                               className={`w-100 px-3 py-2 rounded-xl shadow-md border-2 border-black border-opacity-10  
                           text-black ${styles.input_yellow} ${styles.input_text}`}/>
                    </div>
                </div>
                <br/>
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
                            Contraseña
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
                            ¡Educador registrado Exitosamente!
                        </div>
                    </div>
                )}
                {warningMessage && (
                    <div>
                        <br/>
                        <div className="alert alert-warning d-flex justify-content-center" role="alert">
                            ¡Este educador ya se encuentra registrado!
                        </div>
                    </div>
                )}
                <br/><br/>
                <div className={`d-flex justify-content-center`}>
                    <button onClick={registrarEducador} className={`px-5 py-2 text-black rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${navstyles.upper_bar_yellow} ${styles.btn_text}`}  >
                        Registrar
                    </button>
                </div>
            </div>
        </main>
    )
}