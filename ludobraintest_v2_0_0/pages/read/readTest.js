import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import navstyles from '../../styles/navstyles.module.css'
import AddButton from "@/components/AddButton";

export default function ReadTest(){
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar redirectionPath={`/`}
                      color={navstyles.upper_bar_green}></UpperBar>
            <InstructionBar previousPage={`/modulosCreacion`}
                            instruction={`Crea un nuevo Test`}/>
            <AddButton createPage={`../create/createTest`}
                       color={navstyles.upper_bar_green}/>
            <div className={`container-fluid`}>
            </div>
        </main>
    )
}