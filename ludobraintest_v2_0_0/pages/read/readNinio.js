import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import navstyles from "@/styles/navstyles.module.css";
import styles from "@/styles/styles.module.css";
import AddButton from "@/components/AddButton";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import Link from "next/link";

export default function ReadNinio() {
    const router = useRouter();
    /*------------------- ESTADOS -------------------*/
    const [children, setChildren] = useState([]);
    const [info, setInfo] = useState('');
    const [successMessage, setSuccessMessage] = useState(false); // Estado para el mensaje de registro
    /*------------------- EFECTOS -------------------*/
    useEffect(() => { // useEffect para obtener el usuario de la sesión
        getNinios();
    }, []);
    /*------------------- FUNCIONES -------------------*/
    const getNinios = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/getChildren"
        }).then((res) => {
            if (res.data) {
                setChildren(res.data); // Establece el estado con los resultados
                console.log(res);
            } else {
                console.error("No existe información", res);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const eliminarNinio = (idNinio) => {
        const confirmacion = window.confirm('¿Estás seguro que deseas eliminar este niño?');
        if(confirmacion){
            axios({
                method: "post",
                data: {
                    id_ninio: idNinio,
                },
                withCredentials: true,
                url: "http://localhost:3001/deleteChild"
            }).then((res) => {
                console.log(res);
                if(res.data.message === 'Niño eliminado exitosamente') {
                    // Si el niño se elimina, muestra un mensaje de confirmacion
                    setSuccessMessage(true);
                    // El mensaje desaparece luego de 3 segundos
                    setTimeout(() => {
                        setSuccessMessage(false);
                        getNinios();
                    }, 3000);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    const goActualizarNinio = (idNinio) => {
        sessionStorage.setItem('dataToPass', idNinio);
        router.push('../update/updateNinio')
    }

    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar redirectionPath={`/`}
                      color={navstyles.upper_bar_yellow}/>
            <InstructionBar previousPage={`/modulos`}
                            instruction={`Registra un nuevo niño`}/>
            <AddButton createPage={`../create/createNinio`}
                       color={navstyles.upper_bar_yellow}/>
            <br/>
            {successMessage && (
                <div>
                    <br/>
                    <div className="alert alert-success d-flex justify-content-center" role="alert">
                        ¡Niño eliminado Exitosamente!
                    </div>
                    <br/>
                </div>
            )}
            <div className={`px-32`}>
                <div className={`container-fluid border-1 border-black shadow-md rounded-2xl bg-white
                        ${styles.overflow_container_children}`}>
                    <br/>
                    {children.map((child, index) => (
                        <div key={index} className={`row justify-content-center`}>
                            <div className={`col-9`}>
                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_yellow}`}>
                                    <div className={`card-body`}>
                                        <div className={`container-fluid`}>
                                            <div className={`row justify-content-between`}>
                                                <div className={`col-sm-4 col-lg-4`}>
                                                    <div className={`card-title pt-sm-1 pt-md-1 ${styles.child_data}`}>{child.nombre}</div>
                                                </div>
                                                <div className={`col-sm-4 col-lg-6 d-flex justify-content-center`}>
                                                    <div className={`card-title pt-sm-4 pt-md-3 ${styles.child_data}`}>{child.edad} años</div>
                                                </div>
                                                <div className={`col-sm-4 col-lg-2 d-flex justify-content-around`}>
                                                    <button onClick={() => eliminarNinio(child.id_ninio)}>
                                                        <img src="/images/eliminar.png" alt="trashIcon"
                                                             className={`${styles.manage_icon}`}/>
                                                    </button>
                                                    <button onClick={() => goActualizarNinio(child.id_ninio)}>
                                                        <img src="/images/lapiz.png" alt="editIcon"
                                                             className={`${styles.manage_icon} shadow-2xl`}/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}