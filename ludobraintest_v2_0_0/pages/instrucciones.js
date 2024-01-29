import UpperBar from "@/components/UpperBar";
import button from "@/styles/button.module.css";
import sections from "@/styles/upperBarSectionColors.module.css";
import InstructionBar from "@/components/InstructionBar";
import {useEffect, useState} from "react";
import styles from "@/styles/styles.module.css";
import {useRouter} from "next/router";
import Button from "@/components/Button";

export default function Instrucciones() {
    const router = useRouter();
    let seccion;
    let informacion;
    if (typeof window !== 'undefined') {
        seccion = localStorage.getItem('seccion');
        informacion = localStorage.getItem('informacion');
    }
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
                                    instruction={`Instrucciones para las Evaluaciones de habilidad de ${seccion}`}> </InstructionBar>
                    <div className={`px-5`}>
                        <div
                            className={`container-fluid px-4 py-5 flex justify-center self-center italic ${styles.section_text}`}>
                            {informacion}
                        </div>
                        <br/>
                        <div className={`flex justify-center`}>
                            <div className={styles.div_btn}>
                                <Button instruction={goBack} text={`Regresar`}
                                        bg_color={button.btn_red}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {semejanzasTitle &&
                <div>
                    <UpperBar redirectionPath={`/`}
                              color={sections.semejanzas}></UpperBar>
                    <InstructionBar previousPage={`/menuOpcionesTest`}
                                    instruction={`Instrucciones para las Evaluaciones de habilidad de ${seccion}`}> </InstructionBar>
                    <div className={`px-5`}>
                        <div
                            className={`container-fluid px-4 py-5 flex justify-center self-center italic ${styles.section_text}`}>
                            {informacion}
                        </div>
                        <br/>
                        <div className={`flex justify-center`}>
                            <div className={styles.div_btn}>
                                <Button instruction={goBack} text={`Regresar`} bg_color={button.btn_green}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {vocabularioTitle &&
                <div>
                    <UpperBar redirectionPath={`/`}
                              color={sections.vocabulario}></UpperBar>
                    <InstructionBar previousPage={`/menuOpcionesTest`}
                                    instruction={`Instrucciones para las Evaluaciones de habilidad de ${seccion}`}> </InstructionBar>
                    <div className={`px-5`}>
                        <div
                            className={`container-fluid px-4 py-5 flex justify-center self-center italic ${styles.section_text}`}>
                            {informacion}
                        </div>
                        <br/>
                        <div className={`flex justify-center`}>
                            <div className={styles.div_btn}>
                                <Button instruction={goBack} text={`Regresar`} bg_color={button.btn_blue}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {comprensionTitle &&
                <div>
                    <UpperBar redirectionPath={`/`}
                              color={sections.comprension}></UpperBar>
                    <InstructionBar previousPage={`/menuOpcionesTest`}
                                    instruction={`Instrucciones para las Evaluaciones de habilidad de ${seccion}`}> </InstructionBar>
                    <div className={`px-5`}>
                        <div
                            className={`container-fluid px-4 py-5 flex justify-center self-center italic ${styles.section_text}`}>
                            {informacion}
                        </div>
                        <div className={`flex justify-center`}>
                            <div className={styles.div_btn}>
                                <Button instruction={goBack} text={`Regresar`} bg_color={button.btn_orange}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {dibujosTitle &&
                <div>
                    <UpperBar redirectionPath={`/`}
                              color={sections.dibujos}></UpperBar>
                    <InstructionBar previousPage={`/menuOpcionesTest`}
                                    instruction={`Instrucciones para las Evaluaciones de habilidad de ${seccion}`}> </InstructionBar>
                    <div className={`px-5`}>
                        <div
                            className={`container-fluid px-4 py-5 flex justify-center self-center italic ${styles.section_text}`}>
                            {informacion}
                        </div>
                        <br/>
                        <div className={`flex justify-center`}>
                            <div className={styles.div_btn}>
                                <Button instruction={goBack} text={`Regresar`} bg_color={button.btn_purple}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {nombresTitle &&
                <div>
                    <UpperBar redirectionPath={`/`}
                              color={sections.nombres}></UpperBar>
                    <InstructionBar previousPage={`/menuOpcionesTest`}
                                    instruction={`Instrucciones para las Evaluaciones de habilidad de ${seccion}`}> </InstructionBar>
                    <div className={`px-5`}>
                        <div
                            className={`container-fluid px-4 py-5 flex justify-center self-center italic ${styles.section_text}`}>
                            {informacion}
                        </div>
                        <br/>
                        <div className={`flex justify-center`}>
                            <div className={styles.div_btn}>
                                <Button instruction={goBack} text={`Regresar`} bg_color={button.btn_electric_blue}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {matricesTitle &&
                <div>
                    <UpperBar redirectionPath={`/`}
                              color={sections.matrices}></UpperBar>
                    <InstructionBar previousPage={`/menuOpcionesTest`}
                                    instruction={`Instrucciones para las Evaluaciones de habilidad de ${seccion}`}> </InstructionBar>
                    <div className={`px-5`}>
                        <div
                            className={`container-fluid px-4 py-5 flex justify-center self-center italic ${styles.section_text}`}>
                            {informacion}
                        </div>
                        <br/>
                        <div className={`flex justify-center`}>
                            <div className={styles.div_btn}>
                                <Button instruction={goBack} text={`Regresar`}
                                        bg_color={button.btn_olive}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {conceptosTitle &&
                <div>
                    <UpperBar redirectionPath={`/`}
                              color={sections.conceptos}></UpperBar>
                    <InstructionBar previousPage={`/menuOpcionesTest`}
                                    instruction={`Instrucciones para las Evaluaciones de habilidad de ${seccion}`}> </InstructionBar>
                    <div className={`px-5`}>
                        <div
                            className={`container-fluid px-4 py-5 flex justify-center self-center italic ${styles.section_text}`}>
                            {informacion}
                        </div>
                        <br/>
                        <div className={`flex justify-center`}>
                            <div className={styles.div_btn}>
                                <Button instruction={goBack} text={`Regresar`}
                                        bg_color={button.btn_blue}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {reconocimientoTitle &&
                <div>
                    <UpperBar redirectionPath={`/`}
                              color={sections.reconocimiento}></UpperBar>
                    <InstructionBar previousPage={`/menuOpcionesTest`}
                                    instruction={`Instrucciones para las Evaluaciones de habilidad de ${seccion}`}> </InstructionBar>
                    <div className={`px-5`}>
                        <div
                            className={`container-fluid px-4 py-5 flex justify-center self-center italic ${styles.section_text}`}>
                            {informacion}
                        </div>
                        <br/>
                        <div className={`flex justify-center`}>
                            <div className={styles.div_btn}>
                                <Button instruction={goBack} text={`Regresar`}
                                        bg_color={button.btn_red}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {busquedaTitle &&
                <div>
                    <UpperBar redirectionPath={`/`}
                              color={sections.busqueda}></UpperBar>
                    <InstructionBar previousPage={`/menuOpcionesTest`}
                                    instruction={`Instrucciones para las Evaluaciones de habilidad de ${seccion}`}> </InstructionBar>
                    <div className={`px-5`}>
                        <div
                            className={`container-fluid px-4 py-5 flex justify-center self-center italic ${styles.section_text}`}>
                            {informacion}
                        </div>
                        <br/>
                        <div className={`flex justify-center`}>
                            <div className={styles.div_btn}>
                                <Button instruction={goBack} text={`Regresar`}
                                        bg_color={button.btn_orange}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </main>
    )
}