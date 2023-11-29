import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import {useEffect, useState} from "react";
import axios from "axios";
import navstyles from "@/styles/navstyles.module.css";
import {useRouter} from "next/router";

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
            <UpperBar redirectionPath={`/login`}
                      color={navstyles.upper_bar_yellow}/>
            <InstructionBar previousPage={`../read/readNinio`}
                            instruction={`Actualiza a un niño`}/>
            <div className={`container-fluid text-black`}>
                <br/>
                <div className={`row justify-content-center`}>
                    <div className={`col-3 d-flex justify-content-center`}>
                        <label>Nombre</label>
                    </div>
                    <div className={`col-5 d-flex justify-content-center`}>
                        <input value={registerUpdateName}
                               type="text"
                               onChange={e => setRegisterUpdateName(e.target.value)}
                               className={`w-100`}/>
                    </div>
                </div>
                <br/>
                <div className={`row justify-content-center`}>
                    <div className={`col-3 d-flex justify-content-center`}>
                        <label>Edad</label>
                    </div>
                    <div className={`col-5 d-flex justify-content-center`}>
                        <input value={registerUpdateAge}
                               type="text"
                               onChange={e => setRegisterUpdateAge(e.target.value)}
                               className={`w-100`}/>
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
                    <button onClick={actualizarNinio} className={`btn btn-primary`}>
                        Actualizar
                    </button>
                </div>
                <br/>
            </div>
        </main>
    )
}