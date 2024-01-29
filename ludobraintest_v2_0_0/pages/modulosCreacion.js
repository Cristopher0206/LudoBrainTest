import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import Link from "next/link";
import navstyles from '@/styles/navstyles.module.css'
import styles from '@/styles/styles.module.css'

export default function ModulosCreacion(){
    /*------------------- ESTADOS -------------------*/
    /*------------------- EFECTOS -------------------*/
    /*------------------- FUNCIONES -------------------*/
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar redirectionPath={`/`}
                      color={navstyles.upper_bar_green}/>
            <InstructionBar previousPage={`/modulos`}
                            instruction={`¿Qué quieres crear?`}/>
            <div className={`container-fluid`}>
                <br/> <br/> <br/> <br/> <br/>
                <div className={`row justify-content-evenly`}>
                    <div className={`col-5`}>
                        <Link href="../read/readTest">
                            <button type={`button`} className={`p-5 rounded-xl font-bold text-black shadow-2xl
                            border-2 border-black border-opacity-10 h-100 w-100 ${navstyles.upper_bar_green}`}>
                                <h4>Tests</h4>
                            </button>
                        </Link>
                    </div>
                    <div className={`col-5`}>
                        <Link href="../read/readPregunta">
                            <button type={`button`} className={`p-5 rounded-xl font-bold text-black shadow-2xl
                            border-2 border-black border-opacity-10 h-100 w-100 ${navstyles.upper_bar_red}`}>
                                <h4>Preguntas</h4>
                            </button>
                        </Link>
                    </div>
                </div>
                <br/>
            </div>
        </main>
    )
}