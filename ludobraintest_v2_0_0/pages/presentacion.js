import {router} from "next/client";
import {useRouter} from "next/router";
import UpperBar from "@/components/UpperBar";
import axios from "axios";
import {useEffect, useState} from "react";

export default function Presentacion(){
    const router = useRouter();
    /*------------------- ESTADOS -------------------*/
    /*------------------- EFECTOS -------------------*/
    /*------------------- FUNCIONES -------------------*/
    const nextPage = () => {
        setTimeout(() => {
            router.push('/modulos');
        }, 3000);
    }
    nextPage();
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar redirectionPath={`/login`}/>
            <div className={`container-fluid`}>
                <img src="" alt="Echo"/>
                <div>¡Hola, soy Echo!</div>
            </div>
        </main>
    )
}