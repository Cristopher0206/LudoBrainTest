import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import Link from "next/link";
import navstyles from "@/styles/navstyles.module.css";
import AddButton from "@/components/AddButton";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";

export default function ReadNinio() {
    const router = useRouter();
    /*------------------- ESTADOS -------------------*/
    const [children, setChildren] = useState([]);
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
            setChildren(res.data); // Establece el estado con los resultados
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar redirectionPath={`/login`}
                      color={navstyles.upper_bar_yellow}/>
            <InstructionBar previousPage={`/modulos`}
                            instruction={`Registra un nuevo niño`}/>
            <AddButton createPage={`../create/createNinio`}
                       color={navstyles.upper_bar_yellow}/>
            <div className={`container-fluid border-2 border-black p-0`}>
                {children.map((child) => (
                    <div key={child.id_ninio} className={`container-fluid py-4 px-5 border-2 border-red-500`}>
                        <div className={`row justify-content-between p-0 border-2 border-green-500`}>
                            <div className={`col-3 border-2 border-amber-950`}>
                                {child.nombre}
                            </div>
                            <div className={`col-3 border-2 border-amber-950`}>
                                {child.edad} años
                            </div>
                            <div className={`col-3 d-flex justify-content-end border-2 border-amber-950`}>
                                <img src="" alt="trash logo"/>
                                <img src="" alt="pencil logo"/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}