import UpperBar from "@/components/UpperBar";
import navstyles from "@/styles/navstyles.module.css";
import sections from "@/styles/upperBarSectionColors.module.css";
import InstructionBar from "@/components/InstructionBar";
import {useEffect, useState} from "react";
import styles from "@/styles/styles.module.css";
import {useRouter} from "next/router";

export default function Instrucciones() {
    const router = useRouter();
    const seccion = localStorage.getItem('seccion');
    const informacion = localStorage.getItem('informacion');
    /*------------------- ESTADOS -------------------*/
    // Estados para generar el color
    const [informationTitle, setInformationTitle] = useState(false);
    const [semejanzasTitle, setSemejanzasTitle] = useState(false);
    const [vocabularioTitle, setVocabularioTitle] = useState(false);
    const [comprensionTitle, setComprensionTitle] = useState(false);
    const [dibujosTitle, setDibujosTitle] = useState(false);
    const [nombresTitle, setNombresTitle] = useState(false);
    const [matricesTitle, setMatricesTitle] = useState(false);
    const [conceptosTitle, setConceptosTitle] = useState(false);
    const [reconocimientoTitle, setReconocimientoTitle] = useState(false);
    const [busquedaTitle, setBusquedaTitle] = useState(false);
    /*------------------- EFECTOS -------------------*/
    useEffect(() => {
        generateColor();
    }, []);
    /*------------------- FUNCIONES -------------------*/
    const generateColor = () => {
        switch (seccion) {
            case "Información":
                setInformationTitle(true);
                break;
            case "Semejanzas":
                setSemejanzasTitle(true);
                break;
            case "Vocabulario":
                setVocabularioTitle(true);
                break;
            case "Comprensión":
                setComprensionTitle(true);
                break;
            case "Dibujos":
                setDibujosTitle(true);
                break;
            case "Nombres":
                setNombresTitle(true);
                break;
            case "Matrices":
                setMatricesTitle(true);
                break;
            case "Conceptos":
                setConceptosTitle(true);
                break;
            case "Reconocimiento":
                setReconocimientoTitle(true);
                break;
            case "Búsqueda":
                setBusquedaTitle(true);
                break;
        }
    }
    const goBack = () => {
        router.push(`/menuOpcionesTest`);
    }
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            {informationTitle &&
                <div>
                    <UpperBar redirectionPath={`/`}
                              color={sections.informacion}></UpperBar>
                    <InstructionBar previousPage={`/menuOpcionesTest`}
                                    instruction={`Instrucciones para los test de habilidad de ${seccion}`}> </InstructionBar>
                    <br/>
                    <div className={`px-5`}>
                        <div className={`container-fluid border-2 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                            {informacion}
                        </div>
                        <br/> <br/>
                        <div className={`d-flex justify-content-center mx-96`}>
                            <button onClick={goBack} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.informacion} ${styles.btn_text}`}>
                                Regresar
                            </button>
                        </div>
                    </div>
                </div>
            }
            {semejanzasTitle &&
                <div>
                    <UpperBar redirectionPath={`/`}
                              color={sections.semejanzas}></UpperBar>
                    <InstructionBar previousPage={`/menuOpcionesTest`}
                                    instruction={`Instrucciones para los test de habilidad de ${seccion}`}> </InstructionBar>
                    <br/>
                    <div className={`px-5`}>
                        <div className={`container-fluid border-2 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                            {informacion}
                        </div>
                        <br/> <br/>
                        <div className={`d-flex justify-content-center mx-96`}>
                            <button onClick={goBack} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.semejanzas} ${styles.btn_text}`}>
                                Regresar
                            </button>
                        </div>
                    </div>
                </div>
            }
            {vocabularioTitle &&
                <div>
                    <UpperBar redirectionPath={`/`}
                              color={sections.vocabulario}></UpperBar>
                    <InstructionBar previousPage={`/menuOpcionesTest`}
                                    instruction={`Instrucciones para los test de habilidad de ${seccion}`}> </InstructionBar>
                    <br/>
                    <div className={`px-5`}>
                        <div className={`container-fluid border-2 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                            {informacion}
                        </div>
                        <br/> <br/>
                        <div className={`d-flex justify-content-center mx-96`}>
                            <button onClick={goBack} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.vocabulario} ${styles.btn_text}`}>
                                Regresar
                            </button>
                        </div>
                    </div>
                </div>
            }
            {comprensionTitle &&
                <div>
                    <UpperBar redirectionPath={`/`}
                              color={sections.comprension}></UpperBar>
                    <InstructionBar previousPage={`/menuOpcionesTest`}
                                    instruction={`Instrucciones para los test de habilidad de ${seccion}`}> </InstructionBar>
                    <br/>
                    <div className={`px-5`}>
                        <div className={`container-fluid border-2 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                            {informacion}
                        </div>
                        <br/> <br/>
                        <div className={`d-flex justify-content-center mx-96`}>
                            <button onClick={goBack} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.comprension} ${styles.btn_text}`}>
                                Regresar
                            </button>
                        </div>
                    </div>
                </div>
            }
            {dibujosTitle &&
                <div>
                    <UpperBar redirectionPath={`/`}
                              color={sections.dibujos}></UpperBar>
                    <InstructionBar previousPage={`/menuOpcionesTest`}
                                    instruction={`Instrucciones para los test de habilidad de ${seccion}`}> </InstructionBar>
                    <br/>
                    <div className={`px-5`}>
                        <div className={`container-fluid border-2 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                            {informacion}
                        </div>
                        <br/> <br/>
                        <div className={`d-flex justify-content-center mx-96`}>
                            <button onClick={goBack} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.dibujos} ${styles.btn_text}`}>
                                Regresar
                            </button>
                        </div>
                    </div>
                </div>
            }
            {nombresTitle &&
                <div>
                    <UpperBar redirectionPath={`/`}
                              color={sections.nombres}></UpperBar>
                    <InstructionBar previousPage={`/menuOpcionesTest`}
                                    instruction={`Instrucciones para los test de habilidad de ${seccion}`}> </InstructionBar>
                    <br/>
                    <div className={`px-5`}>
                        <div className={`container-fluid border-2 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                            {informacion}
                        </div>
                        <br/> <br/>
                        <div className={`d-flex justify-content-center mx-96`}>
                            <button onClick={goBack} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.nombres} ${styles.btn_text}`}>
                                Regresar
                            </button>
                        </div>
                    </div>
                </div>
            }
            {matricesTitle &&
                <div>
                    <UpperBar redirectionPath={`/`}
                              color={sections.matrices}></UpperBar>
                    <InstructionBar previousPage={`/menuOpcionesTest`}
                                    instruction={`Instrucciones para los test de habilidad de ${seccion}`}> </InstructionBar>
                    <br/>
                    <div className={`px-5`}>
                        <div className={`container-fluid border-2 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                            {informacion}
                        </div>
                        <br/> <br/>
                        <div className={`d-flex justify-content-center mx-96`}>
                            <button onClick={goBack} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.matrices} ${styles.btn_text}`}>
                                Regresar
                            </button>
                        </div>
                    </div>
                </div>
            }
            {conceptosTitle &&
                <div>
                    <UpperBar redirectionPath={`/`}
                              color={sections.conceptos}></UpperBar>
                    <InstructionBar previousPage={`/menuOpcionesTest`}
                                    instruction={`Instrucciones para los test de habilidad de ${seccion}`}> </InstructionBar>
                    <br/>
                    <div className={`px-5`}>
                        <div className={`container-fluid border-2 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                            {informacion}
                        </div>
                        <br/> <br/>
                        <div className={`d-flex justify-content-center mx-96`}>
                            <button onClick={goBack} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.conceptos} ${styles.btn_text}`}>
                                Regresar
                            </button>
                        </div>
                    </div>
                </div>
            }
            {reconocimientoTitle &&
                <div>
                    <UpperBar redirectionPath={`/`}
                              color={sections.reconocimiento}></UpperBar>
                    <InstructionBar previousPage={`/menuOpcionesTest`}
                                    instruction={`Instrucciones para los test de habilidad de ${seccion}`}> </InstructionBar>
                    <br/>
                    <div className={`px-5`}>
                        <div className={`container-fluid border-2 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                            {informacion}
                        </div>
                        <br/> <br/>
                        <div className={`d-flex justify-content-center mx-96`}>
                            <button onClick={goBack} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.reconocimiento} ${styles.btn_text}`}>
                                Regresar
                            </button>
                        </div>
                    </div>
                </div>
            }
            {busquedaTitle &&
                <div>
                    <UpperBar redirectionPath={`/`}
                              color={sections.busqueda}></UpperBar>
                    <InstructionBar previousPage={`/menuOpcionesTest`}
                                    instruction={`Instrucciones para los test de habilidad de ${seccion}`}> </InstructionBar>
                    <br/>
                    <div className={`px-5`}>
                        <div className={`container-fluid border-2 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                            {informacion}
                        </div>
                        <br/> <br/>
                        <div className={`d-flex justify-content-center mx-96`}>
                            <button onClick={goBack} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.busqueda} ${styles.btn_text}`}>
                                Regresar
                            </button>
                        </div>
                    </div>
                </div>
            }
        </main>
    )
}