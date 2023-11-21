import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import navstyles from '../../styles/navstyles.module.css'
import AddButton from "@/components/AddButton";

export default function ReadPregunta(){
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar redirectionPath={`/modulosCreacion`}
                      color={navstyles.upper_bar_red}></UpperBar>
            <InstructionBar previousPage={`/modulosCreacion`}
                            instruction={`Crea una nueva pregunta`}/>
            <AddButton createPage={`../select/selectSeccionPregunta`}
                       color={navstyles.upper_bar_red}/>
            <div className={`container-fluid`}>

            </div>

        </main>
    )
}