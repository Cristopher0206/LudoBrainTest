import Link from "next/link";
import {useRouter} from "next/router";

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
        <div className="grid gap-x-8 gap-y-5 grid-cols-3 justify-center justify-items-center border-2 border-black">
            <button onClick={() => definirPregunta('Información')}
                    className={`btn btn-dark w-100`}>
                Información
            </button>
            <button onClick={() => definirPregunta('Semejanzas')}
                    className={`btn btn-dark w-100`}>
                Semejanzas
            </button>
            <button onClick={() => definirPregunta('Vocabulario')}
                    className={`btn btn-dark w-100`}>
                Vocabulario
            </button>
            <button onClick={() => definirPregunta('Comprensión')}
                    className={`btn btn-dark w-100`}>
                Comprensión
            </button>
            <button onClick={() => definirPregunta('Dibujos')}
                    className={`btn btn-dark w-100`}>
                Dibujos
            </button>
            <button onClick={() => definirPregunta('Nombres')}
                    className={`btn btn-dark w-100`}>
                Nombres
            </button>
            <button onClick={() => definirPregunta('Matrices')}
                    className={`btn btn-dark w-100`}>
                Matrices
            </button>
            <button onClick={() => definirPregunta('Conceptos')}
                    className={`btn btn-dark w-100`}>
                Conceptos
            </button>
            <button onClick={() => definirPregunta('Reconocimiento')}
                    className={`btn btn-dark w-100`}>
                Reconocimiento
            </button>
            <div></div>
            <button onClick={() => definirPregunta('Búsqueda')}
                    className={`btn btn-dark w-100`}>
                Búsqueda
            </button>

            <div></div>
        </div>
    )
}