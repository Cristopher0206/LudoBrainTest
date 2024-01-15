import Link from "next/link";
import {useRouter} from "next/router";
import styles from "@/styles/styles.module.css";

export default function SectionList(
    {
        informationPage,
        similaritiesPage,
        vocabularyPage,
        comprehensionPage,
        drawsPage,
        namesPage,
        arraysPage,
        conceptsPage,
        recognitionPage,
        searchPage
    }
) {
    const router = useRouter();
    const definirPregunta = (tipoPregunta) => {
        localStorage.setItem('dato', tipoPregunta);
        router.push('../create/createPregunta');
    }
    return (
        <div className="px-5 grid gap-x-8 gap-y-5 grid-cols-3 justify-center justify-items-center">
            <button onClick={() => definirPregunta('Información')}
                    className={`btn py-4 rounded-lg font-bold text-black shadow-md
                            border-2 border-black border-opacity-10 h-100 w-100 ${styles.btn_informacion}`}>
                Información
            </button>
            <button onClick={() => definirPregunta('Semejanzas')}
                    className={`btn py-4 rounded-lg font-bold text-black shadow-md
                            border-2 border-black border-opacity-10 h-100 w-100 ${styles.btn_semejanza}`}>
                Semejanzas
            </button>
            <button onClick={() => definirPregunta('Vocabulario')}
                    className={`btn py-4 rounded-lg font-bold text-black shadow-md
                            border-2 border-black border-opacity-10 h-100 w-100 ${styles.btn_vocabulario}`}>
                Vocabulario
            </button>
            <button onClick={() => definirPregunta('Comprensión')}
                    className={`btn py-4 rounded-lg font-bold text-black shadow-md
                            border-2 border-black border-opacity-10 h-100 w-100 ${styles.btn_comprension}`}>
                Comprensión
            </button>
            <button onClick={() => definirPregunta('Dibujos')}
                    className={`btn py-4 rounded-lg font-bold text-black shadow-md
                            border-2 border-black border-opacity-10 h-100 w-100 ${styles.btn_dibujos}`}>
                Dibujos
            </button>
            <button onClick={() => definirPregunta('Nombres')}
                    className={`btn py-4 rounded-lg font-bold text-black shadow-md
                            border-2 border-black border-opacity-10 h-100 w-100 ${styles.btn_nombres}`}>
                Nombres
            </button>
            <button onClick={() => definirPregunta('Matrices')}
                    className={`btn py-4 rounded-lg font-bold text-black shadow-md
                            border-2 border-black border-opacity-10 h-100 w-100 ${styles.btn_matrices}`}>
                Matrices
            </button>
            <button onClick={() => definirPregunta('Conceptos')}
                    className={`btn py-4 rounded-lg font-bold text-black shadow-md
                            border-2 border-black border-opacity-10 h-100 w-100 ${styles.btn_conceptos}`}>
                Conceptos
            </button>
            <button onClick={() => definirPregunta('Reconocimiento')}
                    className={`btn py-4 rounded-lg font-bold text-black shadow-md
                            border-2 border-black border-opacity-10 h-100 w-100 ${styles.btn_reconocimiento}`}>
                Reconocimiento
            </button>
            <div></div>
            <button onClick={() => definirPregunta('Búsqueda')}
                    className={`btn py-4 rounded-lg font-bold text-black shadow-md
                            border-2 border-black border-opacity-10 h-100 w-100 ${styles.btn_busqueda}`}>
                Búsqueda
            </button>
        </div>
    )
}