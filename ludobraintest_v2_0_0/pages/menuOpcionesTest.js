import UpperBar from "@/components/UpperBar";
import sections from "@/styles/upperBarSectionColors.module.css";
import InstructionBar from "@/components/InstructionBar";
import styles from "@/styles/styles.module.css";
import axios from "axios";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function MenuOpcionesTest(){
    const router = useRouter();
    const id = localStorage.getItem('dato');
    const id_test = localStorage.getItem('dato2');
    let nombre_seccion;
    /*------------------- ESTADOS -------------------*/
    const [test, setTest] = useState('');
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
    useEffect(() => { // useEffect para obtener el usuario de la sesión
        getTest();
    }, []);
    /*------------------- FUNCIONES -------------------*/
    const getTest = () => {
        axios({
            method: 'post',
            data: {
                id_test: id,
            },
            withCredentials: true,
            url: `http://localhost:3001/getNinioTestById`,
        }).then((res) => {
            console.log(res);
            setTest(res.data[0]);
            nombre_seccion = res.data[0].nombre_seccion;
            localStorage.setItem('id_ninio', res.data[0].id_ninio);
            generateColor();
        }).catch((err) => {
            console.log(err);
        })
    }
    const goInstructions = () => {
        localStorage.setItem('seccion', test.nombre_seccion);
        localStorage.setItem('informacion', test.informacion);
        router.push(`/instrucciones`);
    }
    const goBack = () => {
        router.push(`/select/selectNinio`);
    }
    const goTest = () => {
        localStorage.setItem('id_test', id_test);
        switch (test.nombre_seccion) {
            case "Información":
                router.push(`/read/preguntas/readPreguntaInformacion`);
                break;
            case "Semejanzas":
                router.push(`/read/preguntas/readPreguntaSemejanzas`);
                break;
            case "Vocabulario":
                router.push(`/read/preguntas/readPreguntaVocabulario`);
                break;
            case "Comprensión":
                router.push(`/read/preguntas/readPreguntaComprension`);
                break;
            case "Dibujos":
                router.push(`/read/preguntas/readPreguntaDibujos`);
                break;
            case "Nombres":
                router.push(`/read/preguntas/readPreguntaNombres`);
                break;
            case "Matrices":
                router.push(`/read/preguntas/readPreguntaMatrices`);
                break;
            case "Conceptos":
                router.push(`/read/preguntas/readPreguntaConceptos`);
                break;
            case "Reconocimiento":
                router.push(`/read/preguntas/readPreguntaReconocimiento`);
                break;
            case "Búsqueda":
                router.push(`/read/preguntas/readPreguntaBusqueda`);
                break;
        }
    }
    const generateColor = async () => {
        switch (nombre_seccion) {
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
    return(
        <main className={`bg-amber-50 min-h-screen`}>
            {informationTitle &&
                <div>
                    <UpperBar redirectionPath={`/`}
                              color={sections.informacion}></UpperBar>
                    <InstructionBar previousPage={`/select/selectNinio`}
                                    instruction={`Selecciona una opción`}/>
                    <div className={`container-fluid px-5`}>
                        <div className={`row`}>
                            <div className={`col-6`}>
                                <h5>Nombre del test</h5>
                                <div className={`container-fluid border-1 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                                    {test.nombre_test}
                                </div>
                                <br/>
                                <h5>Puntaje obtenido por {test.nombre}</h5>
                                <div className={`container-fluid border-1 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                                    {test.puntaje}
                                </div>
                            </div>
                            <div className={`col-6 ${styles.btns_div}`}>
                                <div className={`d-flex justify-content-center`}>
                                    <button onClick={goTest} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.informacion} ${styles.btn_text}`}>
                                        Iniciar Test
                                    </button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <button onClick={goInstructions} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.informacion} ${styles.btn_text}`}>
                                        Instrucciones
                                    </button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <button onClick={goBack} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.informacion} ${styles.btn_text}`}>
                                        Salir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {semejanzasTitle &&
                <div>
                    <UpperBar redirectionPath={`/`}
                              color={sections.semejanzas}></UpperBar>
                    <InstructionBar previousPage={`/select/selectNinio`}
                                    instruction={`Selecciona una opción`}/>
                    <div className={`container-fluid`}>
                        <div className={`row`}>
                            <div className={`col-6`}>
                                <h5>Nombre del test</h5>
                                <div className={`container-fluid border-1 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                                    {test.nombre_test}
                                </div>
                                <br/>
                                <h5>Puntaje obtenido por {test.nombre}</h5>
                                <div className={`container-fluid border-1 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                                    {test.puntaje}
                                </div>
                            </div>
                            <div className={`col-6 ${styles.btns_div}`}>
                                <div className={`d-flex justify-content-center`}>
                                    <button onClick={goTest} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.semejanzas} ${styles.btn_text}`}>
                                        Iniciar Test
                                    </button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <button onClick={goInstructions} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.semejanzas} ${styles.btn_text}`}>
                                        Instrucciones
                                    </button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <button onClick={goBack} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.semejanzas} ${styles.btn_text}`}>
                                        Salir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {vocabularioTitle &&
                <div>
                    <UpperBar redirectionPath={`/`}
                              color={sections.vocabulario}></UpperBar>
                    <InstructionBar previousPage={`/select/selectNinio`}
                                    instruction={`Selecciona una opción`}/>
                    <div className={`container-fluid`}>
                        <div className={`row`}>
                            <div className={`col-6`}>
                                <h5>Nombre del Test</h5>
                                <div className={`container-fluid border-1 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                                    {test.nombre_test}
                                </div>
                                <br/>
                                <h5>Puntaje obtenido por {test.nombre}</h5>
                                <div className={`container-fluid border-1 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                                    {test.puntaje}
                                </div>
                            </div>
                            <div className={`col-6 ${styles.btns_div}`}>
                                <div className={`d-flex justify-content-center`}>
                                    <button onClick={goTest} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.vocabulario} ${styles.btn_text}`}>
                                        Iniciar Test
                                    </button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <button onClick={goInstructions} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.vocabulario} ${styles.btn_text}`}>
                                        Instrucciones
                                    </button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <button onClick={goBack} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.vocabulario} ${styles.btn_text}`}>
                                        Salir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {comprensionTitle &&
                <div>
                    <UpperBar redirectionPath={`/`}
                              color={sections.comprension}></UpperBar>
                    <InstructionBar previousPage={`/select/selectNinio`}
                                    instruction={`Selecciona una opción`}/>
                    <div className={`container-fluid`}>
                        <div className={`row`}>
                            <div className={`col-6`}>
                                <h5>Nombre del test</h5>
                                <div className={`container-fluid border-1 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                                    {test.nombre_test}
                                </div>
                                <br/>
                                <h5>Puntaje obtenido por {test.nombre}</h5>
                                <div className={`container-fluid border-1 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                                    {test.puntaje}
                                </div>
                            </div>
                            <div className={`col-6 ${styles.btns_div}`}>
                                <div className={`d-flex justify-content-center`}>
                                    <button onClick={goTest} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.comprension} ${styles.btn_text}`}>
                                        Iniciar Test
                                    </button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <button onClick={goInstructions} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.comprension} ${styles.btn_text}`}>
                                        Instrucciones
                                    </button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <button onClick={goBack} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.comprension} ${styles.btn_text}`}>
                                        Salir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {dibujosTitle &&
                <div>
                    <UpperBar redirectionPath={`/`}
                              color={sections.dibujos}></UpperBar>
                    <InstructionBar previousPage={`/select/selectNinio`}
                                    instruction={`Selecciona una opción`}/>
                    <div className={`container-fluid`}>
                        <div className={`row`}>
                            <div className={`col-6`}>
                                <h5>Nombre del test</h5>
                                <div className={`container-fluid border-1 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                                    {test.nombre_test}
                                </div>
                                <br/>
                                <h5>Puntaje obtenido por {test.nombre}</h5>
                                <div className={`container-fluid border-1 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                                    {test.puntaje}
                                </div>
                            </div>
                            <div className={`col-6 ${styles.btns_div}`}>
                                <div className={`d-flex justify-content-center`}>
                                    <button onClick={goTest} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.dibujos} ${styles.btn_text}`}>
                                        Iniciar Test
                                    </button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <button onClick={goInstructions} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.dibujos} ${styles.btn_text}`}>
                                        Instrucciones
                                    </button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <button onClick={goBack} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.dibujos} ${styles.btn_text}`}>
                                        Salir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {nombresTitle &&
                <div>
                    <UpperBar redirectionPath={`/`}
                              color={sections.nombres}></UpperBar>
                    <InstructionBar previousPage={`/select/selectNinio`}
                                    instruction={`Selecciona una opción`}/>
                    <div className={`container-fluid`}>
                        <div className={`row`}>
                            <div className={`col-6`}>
                                <h5>Nombre del test</h5>
                                <div className={`container-fluid border-1 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                                    {test.nombre_test}
                                </div>
                                <br/>
                                <h5>Puntaje obtenido por {test.nombre}</h5>
                                <div className={`container-fluid border-1 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                                    {test.puntaje}
                                </div>
                            </div>
                            <div className={`col-6 ${styles.btns_div}`}>
                                <div className={`d-flex justify-content-center`}>
                                    <button onClick={goTest} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.nombres} ${styles.btn_text}`}>
                                        Iniciar Test
                                    </button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <button onClick={goInstructions} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.nombres} ${styles.btn_text}`}>
                                        Instrucciones
                                    </button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <button onClick={goBack} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.nombres} ${styles.btn_text}`}>
                                        Salir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {matricesTitle &&
                <div>
                    <UpperBar redirectionPath={`/`}
                              color={sections.matrices}></UpperBar>
                    <InstructionBar previousPage={`/select/selectNinio`}
                                    instruction={`Selecciona una opción`}/>
                    <div className={`container-fluid`}>
                        <div className={`row`}>
                            <div className={`col-6`}>
                                <h5>Nombre del test</h5>
                                <div className={`container-fluid border-1 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                                    {test.nombre_test}
                                </div>
                                <br/>
                                <h5>Puntaje obtenido por {test.nombre}</h5>
                                <div className={`container-fluid border-1 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                                    {test.puntaje}
                                </div>
                            </div>
                            <div className={`col-6 ${styles.btns_div}`}>
                                <div className={`d-flex justify-content-center`}>
                                    <button onClick={goTest} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.matrices} ${styles.btn_text}`}>
                                        Iniciar Test
                                    </button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <button onClick={goInstructions} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.matrices} ${styles.btn_text}`}>
                                        Instrucciones
                                    </button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <button onClick={goBack} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.matrices} ${styles.btn_text}`}>
                                        Salir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {conceptosTitle &&
                <div>
                    <UpperBar redirectionPath={`/`}
                              color={sections.conceptos}></UpperBar>
                    <InstructionBar previousPage={`/select/selectNinio`}
                                    instruction={`Selecciona una opción`}/>
                    <div className={`container-fluid`}>
                        <div className={`row`}>
                            <div className={`col-6`}>
                                <h5>Nombre del test</h5>
                                <div className={`container-fluid border-1 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                                    {test.nombre_test}
                                </div>
                                <br/>
                                <h5>Puntaje obtenido por {test.nombre}</h5>
                                <div className={`container-fluid border-1 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                                    {test.puntaje}
                                </div>
                            </div>
                            <div className={`col-6 ${styles.btns_div}`}>
                                <div className={`d-flex justify-content-center`}>
                                    <button onClick={goTest} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.conceptos} ${styles.btn_text}`}>
                                        Iniciar Test
                                    </button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <button onClick={goInstructions} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.conceptos} ${styles.btn_text}`}>
                                        Instrucciones
                                    </button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <button onClick={goBack} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.conceptos} ${styles.btn_text}`}>
                                        Salir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {reconocimientoTitle &&
                <div>
                    <UpperBar redirectionPath={`/`}
                              color={sections.reconocimiento}></UpperBar>
                    <InstructionBar previousPage={`/select/selectNinio`}
                                    instruction={`Selecciona una opción`}/>
                    <div className={`container-fluid`}>
                        <div className={`row`}>
                            <div className={`col-6`}>
                                <h5>Nombre del test</h5>
                                <div className={`container-fluid border-1 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                                    {test.nombre_test}
                                </div>
                                <br/>
                                <h5>Puntaje obtenido por {test.nombre}</h5>
                                <div className={`container-fluid border-1 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                                    {test.puntaje}
                                </div>
                            </div>
                            <div className={`col-6 ${styles.btns_div}`}>
                                <div className={`d-flex justify-content-center`}>
                                    <button onClick={goTest} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.reconocimiento} ${styles.btn_text}`}>
                                        Iniciar Test
                                    </button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <button onClick={goInstructions} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.reconocimiento} ${styles.btn_text}`}>
                                        Instrucciones
                                    </button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <button onClick={goBack} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.reconocimiento} ${styles.btn_text}`}>
                                        Salir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {busquedaTitle &&
                <div>
                    <UpperBar redirectionPath={`/`}
                              color={sections.busqueda}></UpperBar>
                    <InstructionBar previousPage={`/select/selectNinio`}
                                    instruction={`Selecciona una opción`}/>
                    <div className={`container-fluid`}>
                        <div className={`row`}>
                            <div className={`col-6`}>
                                <h5>Nombre del test</h5>
                                <div className={`container-fluid border-1 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                                    {test.nombre_test}
                                </div>
                                <br/>
                                <h5>Puntaje obtenido por {test.nombre}</h5>
                                <div className={`container-fluid border-1 border-black rounded-2xl bg-white px-4 py-5
                        flex justify-center shadow-inner`}>
                                    {test.puntaje}
                                </div>
                            </div>
                            <div className={`col-6 ${styles.btns_div}`}>
                                <div className={`d-flex justify-content-center`}>
                                    <button onClick={goTest} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.busqueda} ${styles.btn_text}`}>
                                        Iniciar Test
                                    </button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <button onClick={goInstructions} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.busqueda} ${styles.btn_text}`}>
                                        Instrucciones
                                    </button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <button onClick={goBack} className={`px-5 py-2 text-black rounded-3xl shadow-sm font-bold
                    border-2 border-black border-opacity-10 w-100 ${sections.busqueda} ${styles.btn_text}`}>
                                        Salir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </main>
    )
}