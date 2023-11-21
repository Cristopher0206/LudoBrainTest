import UpperBar from "@/components/UpperBar";
import navstyles from "@/styles/navstyles.module.css";
import InstructionBar from "@/components/InstructionBar";
import SectionList from "@/components/SectionList";

export default function SelectSeccionPregunta(){
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar redirectionPath={`../read/readPregunta`}
                      color={navstyles.upper_bar_red}></UpperBar>
            <InstructionBar previousPage={`../read/readPregunta`}
                            instruction={`¿Qué tipo de pregunta quieres crear?`}/>
            <SectionList informationPage={`../create/preguntas/createInformacion`}/>
        </main>
    )
}