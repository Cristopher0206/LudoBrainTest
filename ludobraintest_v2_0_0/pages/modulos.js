import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import Link from "next/link";
import navstyles from "@/styles/navstyles.module.css";
import styles from "@/styles/styles.module.css";

export default function Modulos(){
    /*------------------- ESTADOS -------------------*/
    /*------------------- EFECTOS -------------------*/
    /*------------------- FUNCIONES -------------------*/
    return(
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar redirectionPath={`/`}
                      color={navstyles.upper_bar_yellow}/>
            <InstructionBar previousPage={`/`}
                            instruction={`Selecciona un módulo`}/>
            <div className={`container-fluid`}>
                <br/>
                <div className={`row justify-content-evenly`}>
                    <div className={`col-5 p-0 d-flex justify-content-center`}>
                        <Link href="/select/selectNinio" className={`w-100`}>
                            <button className={`p-5 rounded-lg font-bold text-black shadow-md
                            border-2 border-black border-opacity-10 h-100 w-100 ${styles.btn_test}`}>
                                <h4>Módulo de Test</h4>
                            </button>
                        </Link>
                    </div>
                    <div className={`col-5 p-0 d-flex justify-content-center`}>
                        <Link href="/modulosCreacion" className={`w-100`}>
                            <button className={`p-5 rounded-xl font-bold text-black shadow-md
                            border-2 border-black border-opacity-10 w-100 ${styles.btn_creacion}`}>
                                <h4>Módulo de Creación</h4>
                            </button>
                        </Link>
                    </div>
                </div>
                <br/>
                <div className={`row justify-content-evenly`}>
                    <div className={`col-5 p-0 d-flex justify-content-center`}>
                        <Link href="/resultados" className={`w-100`}>
                            <button type={`button`} className={`p-5 rounded-xl font-bold text-black shadow-md
                            border-2 border-black border-opacity-10 w-100 ${styles.btn_resultados}`}>
                                <h4>Módulo de Resultados</h4>
                            </button>
                        </Link>
                    </div>
                    <div className={`col-5 p-0 d-flex justify-content-center`}>
                        <Link href="/read/readNinio" className={`w-100`}>
                            <button type={`button`} className={`p-5 rounded-xl font-bold text-black shadow-md
                            border-2 border-black border-opacity-10 h-100 w-100 ${styles.btn_registro}`}>
                                <h4>Módulo de Registro</h4>
                            </button>
                        </Link>
                    </div>
                </div>
                <br/>
            </div>
        </main>
    )
}