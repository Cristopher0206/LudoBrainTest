import Link from "next/link";

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
    return (
        <div className="grid gap-x-8 gap-y-5 grid-cols-3 justify-center justify-items-center border-2 border-black">
            <Link href={`${informationPage}`}
                  className={`border-2 border-red-500 text-decoration-none text-black 
                  w-100 d-flex justify-content-center`}>
                <button className={`btn btn-dark w-100`}>
                    Información
                </button>
            </Link>
            <Link href={`${similaritiesPage}`}
                  className={`border-2 border-red-500 text-decoration-none text-black 
                  w-100 d-flex justify-content-center`}>
                <button className={`btn btn-dark w-100`}>
                    Semejanzas
                </button>
            </Link>
            <Link href={`${vocabularyPage}`}
                  className={`border-2 border-red-500 text-decoration-none text-black 
                  w-100 d-flex justify-content-center`}>
                <button className={`btn btn-dark w-100`}>
                    Vocabulario
                </button>
            </Link>
            <Link href={`${comprehensionPage}`}
                  className={`border-2 border-red-500 text-decoration-none text-black 
                  w-100 d-flex justify-content-center`}>
                <button className={`btn btn-dark w-100`}>
                    Comprensión
                </button>
            </Link>
            <Link href={`${drawsPage}`}
                  className={`border-2 border-red-500 text-decoration-none text-black 
                  w-100 d-flex justify-content-center`}>
                <button className={`btn btn-dark w-100`}>
                    Dibujos
                </button>
            </Link>
            <Link href={`${namesPage}`}
                  className={`border-2 border-red-500 text-decoration-none text-black 
                  w-100 d-flex justify-content-center`}>
                <button className={`btn btn-dark w-100`}>
                    Nombres
                </button>
            </Link>
            <Link href={`${arraysPage}`}
                  className={`border-2 border-red-500 text-decoration-none text-black 
                  w-100 d-flex justify-content-center`}>
                <button className={`btn btn-dark w-100`}>
                    Matrices
                </button>
            </Link>
            <Link href={`${conceptsPage}`}
                  className={`border-2 border-red-500 text-decoration-none text-black 
                  w-100 d-flex justify-content-center`}>
                <button className={`btn btn-dark w-100`}>
                    Conceptos
                </button>
            </Link>
            <Link href={`${recognitionPage}`}
                  className={`border-2 border-red-500 text-decoration-none text-black 
                  w-100 d-flex justify-content-center`}>
                <button className={`btn btn-dark w-100`}>
                    Reconocimiento
                </button>
            </Link>
            <div></div>
            <Link href={`${searchPage}`}
                  className={`border-2 border-red-500 text-decoration-none text-black 
                  w-100 d-flex justify-content-center`}>
                <button className={`btn btn-dark w-100`}>
                    Búsqueda
                </button>
            </Link>
            <div></div>
        </div>
    )
}