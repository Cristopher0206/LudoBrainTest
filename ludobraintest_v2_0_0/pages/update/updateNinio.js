import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import {useEffect, useState} from "react";
import axios from "axios";
import navstyles from "@/styles/navstyles.module.css";
import {useRouter} from "next/router";
import styles from "@/styles/styles.module.css";

export default function CreateNinio() {
    const router = useRouter();
    /*------------------- ESTADOS -------------------*/
    const [idNinio, setIdNinio] = useState('');
    const [registerUpdateName, setRegisterUpdateName] = useState('');
    const [registerUpdateAge, setRegisterUpdateAge] = useState('');
    const [info, setInfo] = useState(sessionStorage.getItem("dataToPass"));
    //const [registerEducatorId, setRegisterEducatorId] = useState('');
    const [successMessage, setSuccessMessage] = useState(false); // Estado para el mensaje de registro
    /*------------------- EFECTOS -------------------*/
    useEffect(() => { // useEffect para obtener el usuario de la sesión
        getUser();
    }, []);
    /*------------------- FUNCIONES -------------------*/
    const getUser = () => {
        setInfo(sessionStorage.getItem('dataToPass'));
        axios({
            method: "post",
            data: {
                id_ninio: info,
            },
            withCredentials: true,
            url: "http://localhost:3001/getChildrenById"
        }).then(res => {
            setIdNinio(res.data[0].id_ninio);
            setRegisterUpdateName(res.data[0].nombre);
            setRegisterUpdateAge(res.data[0].edad)
        }).catch(err => {
            console.log(err);
        });
    }
    const actualizarNinio = () => { // Actualizar los datos del niño
        axios({
            method: "post",
            data: {
                id_ninio: idNinio,
                nombre: registerUpdateName,
                edad: registerUpdateAge,
            },
            withCredentials: true,
            url: "http://localhost:3001/updateChildren"
        }).then(res => {
            console.log(res);
            if (res.data.message === 'Niño actualizado exitosamente') {
                // Si el niño se actualiza, muestra un mensaje de confirmacion
                setSuccessMessage(true);
                // El mensaje desaparece luego de 3 segundos
                setTimeout(() => {
                    setSuccessMessage(false);
                    router.push('../read/readNinio');
                }, 3000);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar redirectionPath={`/`}
                      color={navstyles.upper_bar_yellow}/>
            <InstructionBar previousPage={`../read/readNinio`}
                            instruction={`Actualiza a un niño`}/>
            <div className={`container-fluid text-black`}>
                <br/>
                <div className={`row justify-content-center`}>
                    <div className={`col-sm-2 col-lg-1 d-flex justify-content-end pt-1`}>
                        <label className={`font-bold ${styles.label_red} ${styles.label}`}>
                            Nombre
                        </label>
                    </div>
                    <div className={`col-sm-9 col-md-8 col-lg-8 d-flex justify-content-center`}>
                        <input value={registerUpdateName}
                               type="text"
                               onChange={e => setRegisterUpdateName(e.target.value)}
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
                        <input value={registerUpdateAge}
                               type="number"
                               onChange={e => setRegisterUpdateAge(e.target.value)}
                               className={`w-100 px-3 py-2 rounded-xl shadow-md border-2 border-black border-opacity-10  
                           text-black ${styles.input_yellow} ${styles.input_text}`}/>
                    </div>
                </div>
                <br/>
                {successMessage && (
                    <div>
                        <div className="alert alert-success d-flex justify-content-center" role="alert">
                            ¡Niño actualizado Exitosamente!
                        </div>
                        <br/>
                    </div>
                )}
                <div className={`d-flex justify-content-center`}>
                    <button onClick={actualizarNinio} className={`px-5 py-2 text-black rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${navstyles.upper_bar_yellow} ${styles.btn_text}`}>
                        Actualizar Jugador
                    </button>
                </div>
                <br/>
            </div>
        </main>
    )
}