import {useEffect, useState} from "react";
import navstyles from "@/styles/navstyles.module.css";
import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";

export default function CreatePregunta(){
    const dato = localStorage.getItem('dato');
    /*------------------- ESTADOS -------------------*/
    const [tipoInformacion, setTipoInformacion] = useState(false);
    const [tipoSemejanza, setTipoSemejanza] = useState(false);
    const [tipoVocabulario, setTipoVocabulario] = useState(false);
    const [tipoComprension, setTipoComprension] = useState(false);
    const [tipoDibujos, setTipoDibujos] = useState(false);
    const [tipoNombres, setTipoNombres] = useState(false);
    const [tipoMatrices, setTipoMatrices] = useState(false);
    const [tipoConceptos, setTipoConceptos] = useState(false);
    const [tipoReconocimiento, setTipoReconocimiento] = useState(false);
    const [tipoBusqueda, setTipoBusqueda] = useState(false);
    /*------------------- EFECTOS -------------------*/
    useEffect(() => { // useEffect para obtener el usuario de la sesión
        crearInterfaz();
    }, []);
    /*------------------- FUNCIONES -------------------*/
    const crearInterfaz = () => {
        switch (dato) {
            case 'Información':
                setTipoInformacion(true);
                break;
            case 'Semejanzas':
                setTipoSemejanza(true);
                break;
            case 'Vocabulario':
                setTipoVocabulario(true);
                break;
            case 'Comprensión':
                setTipoComprension(true);
                break;
            case 'Dibujos':
                setTipoDibujos(true);
                break;
            case 'Nombres':
                setTipoNombres(true);
                break;
            case 'Matrices':
                setTipoMatrices(true);
                break;
            case 'Conceptos':
                setTipoConceptos(true);
                break;
            case 'Reconocimiento':
                setTipoReconocimiento(true);
                break;
            case 'Búsqueda':
                setTipoBusqueda(true);
                break;
        }
    }

    return(
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar redirectionPath={`/`}
                      color={navstyles.upper_bar_red} questionType={dato}/>
            <InstructionBar previousPage={`../select/selectSeccionPregunta`}
                            instruction={`Crea una pregunta`}/>
            {tipoInformacion && (
                <div>
                    CREAR UNA PREGUNTA DE INFORMACIÓN
                </div>
            )}
            {tipoSemejanza && (
                <div>
                    CREAR UNA PREGUNTA DE SEMEJANZAS
                </div>
            )}
            {tipoVocabulario && (
                <div>
                    CREAR UNA PREGUNTA DE VOCABULARIO
                </div>
            )}
            {tipoComprension && (
                <div>
                    CREAR UNA PREGUNTA DE COMPRENSIÓN
                </div>
            )}
            {tipoDibujos && (
                <div>
                    CREAR UNA PREGUNTA DE DIBUJOS
                </div>
            )}
            {tipoNombres && (
                <div>
                    CREAR UNA PREGUNTA DE NOMBRES
                </div>
            )}
            {tipoMatrices && (
                <div>
                    CREAR UNA PREGUNTA DE MATRICES
                </div>
            )}
            {tipoConceptos && (
                <div>
                    CREAR UNA PREGUNTA DE CONCEPTOS
                </div>
            )}
            {tipoReconocimiento && (
                <div>
                    CREAR UNA PREGUNTA DE RECONOCIMIENTO
                </div>
            )}
            {tipoBusqueda && (
                <div>
                    CREAR UNA PREGUNTA DE BÚSQUEDA
                </div>
            )}
        </main>
    )
}