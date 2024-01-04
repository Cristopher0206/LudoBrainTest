import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import navstyles from '../../styles/navstyles.module.css'
import styles from '../../styles/styles.module.css'
import AddButton from "@/components/AddButton";
import {useState, useEffect} from "react";
import axios from "axios";
import Link from "next/link";

export default function ReadTest(){
    /*------------------- ESTADOS -------------------*/
    const [tests, setTests] = useState([]);
    /*------------------- EFECTOS -------------------*/
    useEffect(() => {
        getTests();
    }, []);
    /*------------------- FUNCIONES -------------------*/
    const getTests = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3001/getTests"
        }).then((res) => {
            setTests(res.data);
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
                    {tests.map((test) => (
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
                                                <div className={`col-sm-4 col-lg-2 d-flex justify-content-around`}>
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
            </div>
        </main>
    )
}