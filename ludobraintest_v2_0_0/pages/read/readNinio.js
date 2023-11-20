import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import Link from "next/link";

export default function ReadNinio(){
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar redirectionPath={`/login`}></UpperBar>
            <InstructionBar previousPage={`/modulos`}
                            instruction={`Registra un nuevo niño`}/>
            <div className={`container-fluid d-flex justify-content-center border-2 border-black`}>
                <Link href="../create/createNinio">
                    <button type={`button`} className={`bg-amber-400 rounded-full px-2 
                                                        font-bold text-black`}>
                        +
                    </button>
                </Link>
            </div>
            <div className={`container-fluid`}>

            </div>
        </main>
    )
}