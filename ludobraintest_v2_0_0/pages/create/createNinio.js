import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import {useEffect, useState} from "react";
import axios from "axios";
import navstyles from "@/styles/navstyles.module.css";
import styles from "@/styles/styles.module.css";
import {useRouter} from "next/router";

export default function CreateNinio() {
    const router = useRouter();
    /*------------------- ESTADOS -------------------*/
    const [registerName, setRegisterName] = useState('');
    const [registerAge, setRegisterAge] = useState('');
    const [registerEducatorId, setRegisterEducatorId] = useState('');
    const [successMessage, setSuccessMessage] = useState(false); // Estado para el mensaje de registro
    const [warningMessage, setWarningMessage] = useState(false); // Estado para la advertencia de registro
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
            setRegisterEducatorId(res.data.id);
        }).catch(err => {
            console.log(err);
            //router.push('/login');
        });
    }
    const clearFields = () => { /* Funciòn para limpiar los campos */
        setRegisterName('');
        setRegisterAge('');
    };
    const crearNinio = () => {
        axios({
            method: "post",
            data: {
                nombre: registerName,
                edad: registerAge,
            },
            withCredentials: true,
            url: "http://localhost:3001/crearNinio"
        }).then((res) => {
            console.log(res);
            if (res.data.message === 'Niño creado correctamente') {
                // Si el niño se crea, muestra un mensaje de confirmacion
                setSuccessMessage(true);
                // El mensaje desaparece luego de 3 segundos
                setTimeout(() => {
                    setSuccessMessage(false);
                    router.push('../read/readNinio');
                }, 3000);
            } else if(res.data.message === 'Este niño ya se encuentra registrado') {
                // Si el niño ya existe, muestra un mensaje de adveertencia
                setWarningMessage(true);
                // El mensaje desaparece luego de 3 segundos
                setTimeout(() => {
                    setWarningMessage(false);
                }, 3000);
                clearFields();
            }
        }).catch((err) => {
            console.log("No Exitoso", err);
        })
    }
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar redirectionPath={`/`}
                      color={navstyles.upper_bar_yellow}/>
            <InstructionBar previousPage={`../read/readNinio`}
                            instruction={`Registra a un niño`}/>
            <div className={`container-fluid text-black`}>
                <br/>
                <div className={`row justify-content-center`}>
                    <div className={`col-sm-2 col-lg-1 d-flex justify-content-end pt-1`}>
                        <label className={`font-bold ${styles.label_red} ${styles.label}`}>
                            Nombre
                        </label>
                    </div>
                    <div className={`col-sm-9 col-md-8 col-lg-8 d-flex justify-content-center`}>
                        <input value={registerName}
                               type="text"
                               onChange={e => setRegisterName(e.target.value)}
                               className={`w-100 px-3 py-2 rounded-xl shadow-md border-2 border-black border-opacity-10  
                           text-black ${styles.input_yellow} ${styles.input_text}`}/>
                    </div>
                </div>
                <br/>
                <div className={`row justify-content-center`}>
                    <div className={`col-sm-2 col-lg-1 d-flex justify-content-end pt-1`}>
                        <label className={`font-bold ${styles.label_red} ${styles.label}`}>
                            Edad
                        </label>
                    </div>
                    <div className={`col-sm-9 col-md-8 col-lg-8 d-flex justify-content-center`}>
                        <input value={registerAge}
                               type="number"
                               onChange={e => setRegisterAge(e.target.value)}
                               className={`w-100 px-3 py-2 rounded-xl shadow-md border-2 border-black border-opacity-10  
                           text-black ${styles.input_yellow} ${styles.input_text}`}/>
                    </div>
                </div>
                <br/>
                {successMessage && (
                    <div>
                        <div className="alert alert-success d-flex justify-content-center" role="alert">
                            ¡Niño registrado Exitosamente!
                        </div>
                        <br/>
                    </div>
                )}
                {warningMessage && (
                    <div>
                        <div className="alert alert-warning d-flex justify-content-center" role="alert">
                            ¡Este niño ya se encuentra registrado!
                        </div>
                        <br/>
                    </div>
                )}
                <br/>
                <div className={`d-flex justify-content-center`}>
                    <button onClick={crearNinio} className={`px-5 py-2 text-black rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${navstyles.upper_bar_yellow} ${styles.btn_text}`}>
                        Registrar Jugador
                    </button>
                </div>
                <br/>
            </div>
        </main>
    )
}