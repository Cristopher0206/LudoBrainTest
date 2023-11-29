import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import navstyles from "@/styles/navstyles.module.css";
import styles from "@/styles/styles.module.css";
import AddButton from "@/components/AddButton";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";

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
            {successMessage && (
                <div>
                    <br/>
                    <div className="alert alert-success d-flex justify-content-center" role="alert">
                        ¡Niño eliminado Exitosamente!
                    </div>
                    <br/>
                </div>
            )}
            <div className={`container-fluid border-2 border-black p-0`}>
                {children.map((child, index) => (
                    <div key={index} className={`container-fluid py-4 px-5 border-2 border-red-500`}>
                        <div className={`row justify-content-between p-0 border-2 border-green-500`}>
                            <div className={`col-3 border-2 border-amber-950`}>
                                {child.nombre}
                            </div>
                            <div className={`col-3 border-2 border-amber-950`}>
                                {child.edad} años
                            </div>
                            <div className={`col-3 d-flex justify-content-evenly border-2 border-amber-950`}>
                                <button onClick={() => eliminarNinio(child.id_ninio)}>
                                    <img src="/images/eliminar.png" alt="trashIcon"
                                         className={`${styles.manage_icon} border-2 border-black`}/>
                                </button>
                                <button onClick={() => goActualizarNinio(child.id_ninio)}>
                                    <img src="/images/lapiz.png" alt="editIcon"
                                         className={`${styles.manage_icon} shadow-2xl border-2 border-black`}/>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}