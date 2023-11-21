import {useRouter} from "next/router";
import UpperBar from "@/components/UpperBar";
import axios from "axios";
import {useEffect, useState} from "react";
import navstyles from "@/styles/navstyles.module.css";

export default function Presentacion(){
    const router = useRouter();
    /*------------------- ESTADOS -------------------*/
    /*------------------- EFECTOS -------------------*/
    useEffect(() => {
        const nextPage = () => {
            setTimeout(() => {
                router.push('/modulos');
            }, 3000);
        }
        nextPage();
    }, [router]);
    /*------------------- FUNCIONES -------------------*/
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar redirectionPath={`/login`}
                      color={navstyles.upper_bar_yellow}/>
            <div className={`container-fluid`}>
                <img src="" alt="Echo"/>
                <div>¡Hola, soy Echo!</div>
            </div>
        </main>
    )
}