import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Modulos(){
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
            //router.push('/login');
        });
    }
    return(
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar username={name} redirectionPath={`/login`}/>
            <InstructionBar previousPage={`/presentacion`}
                            instruction={`Selecciona un módulo`}/>
            <div className={`container-fluid border-2 border-black`}>
                <br/>
                <div className={`row justify-content-evenly`}>
                    <div className={`col-5 border-2 border-red-500`}>
                        Módulo de test
                    </div>
                    <div className={`col-5 border-2 border-red-500`}>
                        Módulo de creación
                    </div>
                </div>
                <br/>
                <div className={`row justify-content-evenly`}>
                    <div className={`col-5 border-2 border-red-500`}>
                        Módulo de registro
                    </div>
                    <div className={`col-5 border-2 border-red-500`}>
                        Módulo de resultados
                    </div>
                </div>
                <br/>
            </div>
        </main>
    )
}