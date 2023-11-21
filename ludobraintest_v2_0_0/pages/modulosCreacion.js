import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import Link from "next/link";
import navstyles from '@/styles/navstyles.module.css'

export default function ModulosCreacion(){
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar redirectionPath={`/modulos`}
                      color={navstyles.upper_bar_yellow}/>
            <InstructionBar previousPage={`/modulos`}
                            instruction={`¿Qué quieres crear?`}/>
            <div className={`container-fluid border-2 border-black`}>
                <br/>
                <div className={`row justify-content-evenly`}>
                    <div className={`col-5 border-2 border-red-500`}>
                        <Link href="../read/readTest">
                            <button type={`button`} className={`btn btn-success w-100`}>
                                Test
                            </button>
                        </Link>
                    </div>
                    <div className={`col-5 border-2 border-red-500`}>
                        <Link href="../read/readPregunta">
                            <button type={`button`} className={`btn btn-danger w-100`}>
                                Preguntas
                            </button>
                        </Link>
                    </div>
                </div>
                <br/>
            </div>
        </main>
    )
}