import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import Link from "next/link";
import navstyles from "@/styles/navstyles.module.css";

export default function Modulos(){
    /*------------------- ESTADOS -------------------*/
    /*------------------- EFECTOS -------------------*/
    /*------------------- FUNCIONES -------------------*/
    return(
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar redirectionPath={`/login`}
                      color={navstyles.upper_bar_yellow}/>
            <InstructionBar previousPage={`/presentacion`}
                            instruction={`Selecciona un módulo`}/>
            <div className={`container-fluid border-2 border-black`}>
                <br/>
                <div className={`row justify-content-evenly`}>
                    <div className={`col-5 border-2 border-red-500`}>
                        Módulo de test
                    </div>
                    <div className={`col-5 border-2 border-red-500`}>
                        <Link href="/modulosCreacion">
                            <button type={`button`} className={`btn btn-success w-100`}>
                                Módulo de Creación
                            </button>
                        </Link>
                    </div>
                </div>
                <br/>
                <div className={`row justify-content-evenly`}>
                    <div className={`col-5 border-2 border-red-500`}>
                        <Link href="/read/readNinio">
                            <button type={`button`} className={`btn btn-warning w-100`}>
                                Módulo de Registro
                            </button>
                        </Link>
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