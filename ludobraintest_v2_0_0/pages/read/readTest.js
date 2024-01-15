import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import navstyles from '../../styles/navstyles.module.css'
import styles from '../../styles/styles.module.css'
import AddButton from "@/components/AddButton";
import {useState, useEffect} from "react";
import axios from "axios";
import Link from "next/link";

export default function ReadTest() {
    /*------------------- ESTADOS -------------------*/
    const [tests, setTests] = useState([]);
    const [informacionTests, setInformacionTests] = useState([]);
    const [semejanzasTests, setSemejanzasTests] = useState([]);
    const [vocabularioTests, setVocabularioTests] = useState([]);
    const [comprensionTests, setComprensionTests] = useState([]);
    const [dibujosTests, setDibujosTests] = useState([]);
    const [nombresTests, setNombresTests] = useState([]);
    const [matricesTests, setMatricesTests] = useState([]);
    const [conceptosTests, setConceptosTests] = useState([]);
    const [reconocimientoTests, setReconocimientoTests] = useState([]);
    const [busquedaTests, setBusquedaTests] = useState([]);
    // Estados para generar los títulos
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
        getInformacionTests();
        getSemejanzasTests();
        getVocabularioTests();
        getComprensionTests();
        getDibujosTests();
        getNombresTests();
        getMatricesTests();
        getConceptosTests();
        getReconocimientoTests();
        getBusquedaTests();
    }, []);
    /*------------------- FUNCIONES -------------------*/
    const getInformacionTests = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/getInformacionTests"
        }).then((res) => {
            setInformacionTests(res.data);
            if (res.data.length !== 0) {
                setInformationTitle(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getSemejanzasTests = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/getSemejanzasTests"
        }).then((res) => {
            setSemejanzasTests(res.data);
            if (res.data.length !== 0) {
                setSemejanzasTitle(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getVocabularioTests = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/getVocabularioTests"
        }).then((res) => {
            setVocabularioTests(res.data);
            if (res.data.length !== 0) {
                setVocabularioTitle(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getComprensionTests = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/getComprensionTests"
        }).then((res) => {
            setComprensionTests(res.data);
            if (res.data.length !== 0) {
                setComprensionTitle(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getDibujosTests = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/getDibujosTests"
        }).then((res) => {
            setDibujosTests(res.data);
            if (res.data.length !== 0) {
                setDibujosTitle(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getNombresTests = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/getNombresTests"
        }).then((res) => {
            setNombresTests(res.data);
            if (res.data.length !== 0) {
                setNombresTitle(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getMatricesTests = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/getMatricesTests"
        }).then((res) => {
            setMatricesTests(res.data);
            if (res.data.length !== 0) {
                setMatricesTitle(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getConceptosTests = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/getConceptosTests"
        }).then((res) => {
            setConceptosTests(res.data);
            if (res.data.length !== 0) {
                setConceptosTitle(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getReconocimientoTests = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/getReconocimientoTests"
        }).then((res) => {
            setReconocimientoTests(res.data);
            if (res.data.length !== 0) {
                setReconocimientoTitle(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getBusquedaTests = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/getBusquedaTests"
        }).then((res) => {
            setBusquedaTests(res.data);
            if (res.data.length !== 0) {
                setBusquedaTitle(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar redirectionPath={`/`}
                      color={navstyles.upper_bar_green}></UpperBar>
            <InstructionBar previousPage={`/modulosCreacion`}
                            instruction={`Crea un nuevo Test`}/>
            <AddButton createPage={`../create/createTest`}
                       color={navstyles.upper_bar_green}/>
            <div className={`container-fluid`}>
                <br/> <br/>
                <div className={`container-fluid`}>
                    {informationTitle &&
                        <div className={`row justify-content-center`}>
                            <div className={`col-9`}>
                                <h3 className={`text-center`}>Información</h3>
                                {informacionTests.map((test) => (
                                    <div key={test.id_test} className={`row justify-content-center`}>
                                        <div className={`col-9`}>
                                            <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_green}`}>
                                                <div className={`card-body`}>
                                                    <div className={`container-fluid`}>
                                                        <div className={`row`}>
                                                            <div className={`col-sm-8 col-lg-10`}>
                                                                <h5 className={`card-title pt-2`}>{test.nombre_test}</h5>
                                                            </div>
                                                            <div
                                                                className={`col-sm-4 col-lg-2 d-flex justify-content-around`}>
                                                                <Link href={`#`}>
                                                                    <img src="/images/eliminar.png"
                                                                         alt="Eliminar LOGO"
                                                                         className={`h-10`}/>
                                                                </Link>
                                                                <Link href={`#`}>
                                                                    <img src="/images/lapiz.png"
                                                                         alt="Eliminar LOGO"
                                                                         className={`h-10`}/>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <br/>
                        </div>
                    }
                    {semejanzasTitle &&
                        <div className={`row justify-content-center`}>
                            <div className={`col-9`}>
                                <h3 className={`text-center`}>Semejanzas</h3>
                                {semejanzasTests.map((test) => (
                                    <div key={test.id_test} className={`row justify-content-center`}>
                                        <div className={`col-9`}>
                                            <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_green}`}>
                                                <div className={`card-body`}>
                                                    <div className={`container-fluid`}>
                                                        <div className={`row`}>
                                                            <div className={`col-sm-8 col-lg-10`}>
                                                                <h5 className={`card-title pt-2`}>{test.nombre_test}</h5>
                                                            </div>
                                                            <div
                                                                className={`col-sm-4 col-lg-2 d-flex justify-content-around`}>
                                                                <Link href={`#`}>
                                                                    <img src="/images/eliminar.png"
                                                                         alt="Eliminar LOGO"
                                                                         className={`h-10`}/>
                                                                </Link>
                                                                <Link href={`#`}>
                                                                    <img src="/images/lapiz.png"
                                                                         alt="Eliminar LOGO"
                                                                         className={`h-10`}/>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <br/>
                        </div>
                    }
                    {vocabularioTitle &&
                        <div className={`row justify-content-center`}>
                            <div className={`col-9`}>
                                <h3 className={`text-center`}>Vocabulario</h3>
                                {vocabularioTests.map((test) => (
                                    <div key={test.id_test} className={`row justify-content-center`}>
                                        <div className={`col-9`}>
                                            <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_green}`}>
                                                <div className={`card-body`}>
                                                    <div className={`container-fluid`}>
                                                        <div className={`row`}>
                                                            <div className={`col-sm-8 col-lg-10`}>
                                                                <h5 className={`card-title pt-2`}>{test.nombre_test}</h5>
                                                            </div>
                                                            <div
                                                                className={`col-sm-4 col-lg-2 d-flex justify-content-around`}>
                                                                <Link href={`#`}>
                                                                    <img src="/images/eliminar.png"
                                                                         alt="Eliminar LOGO"
                                                                         className={`h-10`}/>
                                                                </Link>
                                                                <Link href={`#`}>
                                                                    <img src="/images/lapiz.png"
                                                                         alt="Eliminar LOGO"
                                                                         className={`h-10`}/>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <br/>
                        </div>
                    }
                    {comprensionTitle &&
                        <div className={`row justify-content-center`}>
                            <div className={`col-9`}>
                                <h3 className={`text-center`}>Comprensión</h3>
                                {comprensionTests.map((test) => (
                                    <div key={test.id_test} className={`row justify-content-center`}>
                                        <div className={`col-9`}>
                                            <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_green}`}>
                                                <div className={`card-body`}>
                                                    <div className={`container-fluid`}>
                                                        <div className={`row`}>
                                                            <div className={`col-sm-8 col-lg-10`}>
                                                                <h5 className={`card-title pt-2`}>{test.nombre_test}</h5>
                                                            </div>
                                                            <div
                                                                className={`col-sm-4 col-lg-2 d-flex justify-content-around`}>
                                                                <Link href={`#`}>
                                                                    <img src="/images/eliminar.png"
                                                                         alt="Eliminar LOGO"
                                                                         className={`h-10`}/>
                                                                </Link>
                                                                <Link href={`#`}>
                                                                    <img src="/images/lapiz.png"
                                                                         alt="Eliminar LOGO"
                                                                         className={`h-10`}/>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <br/>
                        </div>
                    }
                    {dibujosTitle &&
                        <div className={`row justify-content-center`}>
                            <div className={`col-9`}>
                                <h3 className={`text-center`}>Dibujos</h3>
                                {dibujosTests.map((test) => (
                                    <div key={test.id_test} className={`row justify-content-center`}>
                                        <div className={`col-9`}>
                                            <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_green}`}>
                                                <div className={`card-body`}>
                                                    <div className={`container-fluid`}>
                                                        <div className={`row`}>
                                                            <div className={`col-sm-8 col-lg-10`}>
                                                                <h5 className={`card-title pt-2`}>{test.nombre_test}</h5>
                                                            </div>
                                                            <div
                                                                className={`col-sm-4 col-lg-2 d-flex justify-content-around`}>
                                                                <Link href={`#`}>
                                                                    <img src="/images/eliminar.png"
                                                                         alt="Eliminar LOGO"
                                                                         className={`h-10`}/>
                                                                </Link>
                                                                <Link href={`#`}>
                                                                    <img src="/images/lapiz.png"
                                                                         alt="Eliminar LOGO"
                                                                         className={`h-10`}/>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <br/>
                        </div>
                    }
                    {nombresTitle &&
                        <div className={`row justify-content-center`}>
                            <div className={`col-9`}>
                                <h3 className={`text-center`}>Nombres</h3>
                                {nombresTests.map((test) => (
                                    <div key={test.id_test} className={`row justify-content-center`}>
                                        <div className={`col-9`}>
                                            <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_green}`}>
                                                <div className={`card-body`}>
                                                    <div className={`container-fluid`}>
                                                        <div className={`row`}>
                                                            <div className={`col-sm-8 col-lg-10`}>
                                                                <h5 className={`card-title pt-2`}>{test.nombre_test}</h5>
                                                            </div>
                                                            <div
                                                                className={`col-sm-4 col-lg-2 d-flex justify-content-around`}>
                                                                <Link href={`#`}>
                                                                    <img src="/images/eliminar.png"
                                                                         alt="Eliminar LOGO"
                                                                         className={`h-10`}/>
                                                                </Link>
                                                                <Link href={`#`}>
                                                                    <img src="/images/lapiz.png"
                                                                         alt="Eliminar LOGO"
                                                                         className={`h-10`}/>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <br/>
                        </div>
                    }
                    {matricesTitle &&
                        <div className={`row justify-content-center`}>
                            <div className={`col-9`}>
                                <h3 className={`text-center`}>Matrices</h3>
                                {matricesTests.map((test) => (
                                    <div key={test.id_test} className={`row justify-content-center`}>
                                        <div className={`col-9`}>
                                            <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_green}`}>
                                                <div className={`card-body`}>
                                                    <div className={`container-fluid`}>
                                                        <div className={`row`}>
                                                            <div className={`col-sm-8 col-lg-10`}>
                                                                <h5 className={`card-title pt-2`}>{test.nombre_test}</h5>
                                                            </div>
                                                            <div
                                                                className={`col-sm-4 col-lg-2 d-flex justify-content-around`}>
                                                                <Link href={`#`}>
                                                                    <img src="/images/eliminar.png"
                                                                         alt="Eliminar LOGO"
                                                                         className={`h-10`}/>
                                                                </Link>
                                                                <Link href={`#`}>
                                                                    <img src="/images/lapiz.png"
                                                                         alt="Eliminar LOGO"
                                                                         className={`h-10`}/>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <br/>
                        </div>
                    }
                    {conceptosTitle &&
                        <div className={`row justify-content-center`}>
                            <div className={`col-9`}>
                                <h3 className={`text-center`}>Conceptos</h3>
                                {conceptosTests.map((test) => (
                                    <div key={test.id_test} className={`row justify-content-center`}>
                                        <div className={`col-9`}>
                                            <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_green}`}>
                                                <div className={`card-body`}>
                                                    <div className={`container-fluid`}>
                                                        <div className={`row`}>
                                                            <div className={`col-sm-8 col-lg-10`}>
                                                                <h5 className={`card-title pt-2`}>{test.nombre_test}</h5>
                                                            </div>
                                                            <div
                                                                className={`col-sm-4 col-lg-2 d-flex justify-content-around`}>
                                                                <Link href={`#`}>
                                                                    <img src="/images/eliminar.png"
                                                                         alt="Eliminar LOGO"
                                                                         className={`h-10`}/>
                                                                </Link>
                                                                <Link href={`#`}>
                                                                    <img src="/images/lapiz.png"
                                                                         alt="Eliminar LOGO"
                                                                         className={`h-10`}/>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <br/>
                        </div>
                    }
                    {reconocimientoTitle &&
                        <div className={`row justify-content-center`}>
                            <div className={`col-9`}>
                                <h3 className={`text-center`}>Reconocimiento</h3>
                                {reconocimientoTests.map((test) => (
                                    <div key={test.id_test} className={`row justify-content-center`}>
                                        <div className={`col-9`}>
                                            <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl ${styles.card_body_green}`}>
                                                <div className={`card-body`}>
                                                    <div className={`container-fluid`}>
                                                        <div className={`row`}>
                                                            <div className={`col-sm-8 col-lg-10`}><h5 className={`card-title pt-2`}>{test.nombre_test}</h5></div>
                                                            <div className={`col-sm-4 col-lg-2 d-flex justify-content-around`}>
                                                                <Link href={`#`}><img src="/images/eliminar.png" alt="Eliminar LOGO" className={`h-10`}/></Link>
                                                                <Link href={`#`}><img src="/images/lapiz.png" alt="Eliminar LOGO" className={`h-10`}/></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <br/>
                        </div>
                    }
                    {busquedaTitle &&
                        <div className={`row justify-content-center`}>
                            <div className={`col-9`}>
                                <h3 className={`text-center`}>Búsqueda</h3>
                                {busquedaTests.map((test) => (
                                    <div key={test.id_test} className={`row justify-content-center`}>
                                        <div className={`col-9`}><div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl ${styles.card_body_green}`}>
                                            <div className={`card-body`}>
                                                <div className={`container-fluid`}>
                                                    <div className={`row`}>
                                                        <div className={`col-sm-8 col-lg-10`}><h5 className={`card-title pt-2`}>{test.nombre_test}</h5></div>
                                                        <div className={`col-sm-4 col-lg-2 d-flex justify-content-around`}>
                                                            <Link href={`#`}><img src="/images/eliminar.png" alt="Eliminar LOGO" className={`h-10`}/></Link>
                                                            <Link href={`#`}><img src="/images/lapiz.png" alt="Eliminar LOGO" className={`h-10`}/></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <br/>
                        </div>
                    }
                </div>
            </div>
        </main>
    )
}