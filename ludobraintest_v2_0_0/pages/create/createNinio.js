import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import {useEffect, useState} from "react";
import axios from "axios";
import navstyles from "@/styles/navstyles.module.css";

export default function CreateNinio() {
    /*------------------- ESTADOS -------------------*/
    const [registerName, setRegisterName] = useState('');
    const [registerAge, setRegisterAge] = useState('');
    const [registerEducatorId, setRegisterEducatorId] = useState('');
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
    const crearNinio = () => {
        axios({
            method: "post",
            data: {
                nombre: registerName,
                edad: registerAge,
                id_educador: registerEducatorId
            },
            withCredentials: true,
            url: "http://localhost:3001/crearNinio"
        }).then((res) => {
            console.log("Exitoso", res);
        }).catch((err) => {
            console.log("No Exitoso", err);
        })
    }
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar redirectionPath={`/login`}
                      color={navstyles.upper_bar_yellow}/>
            <InstructionBar previousPage={`../read/readNinio`}
                            instruction={`Registra a un niño`}/>
            <div className={`container-fluid text-black`}>
                <br/>
                <div className={`row justify-content-center`}>
                    <div className={`col-3 d-flex justify-content-center`}>
                        <label>Nombre</label>
                    </div>
                    <div className={`col-5 d-flex justify-content-center`}>
                        <input name={`nombre`}
                               type="text"
                               onChange={e => setRegisterName(e.target.value)}
                               className={`w-100`}/>
                    </div>
                </div>
                <br/>
                <div className={`row justify-content-center`}>
                    <div className={`col-3 d-flex justify-content-center`}>
                        <label>Edad</label>
                    </div>
                    <div className={`col-5 d-flex justify-content-center`}>
                        <input name={`edad`}
                               type="text"
                               onChange={e => setRegisterAge(e.target.value)}
                               className={`w-100`}/>
                    </div>
                </div>
                <br/>
                <div className={`d-flex justify-content-center`}>
                    <button onClick={crearNinio} className={`btn btn-primary`}>Registrar</button>
                </div>
                <br/>
            </div>
        </main>
    )
}