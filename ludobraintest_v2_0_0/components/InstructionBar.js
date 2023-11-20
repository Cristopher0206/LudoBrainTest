import Link from "next/link";

export default function InstructionBar({previousPage, instruction}){
    return (
        <div className={`container-fluid border-2 border-black`}>
            <div className={`row p-0 py-4`}>
                <div className={`col-4 d-flex justify-content-center`}>
                    <Link href={previousPage}>
                        <img src="" alt="back"/>
                    </Link>
                </div>
                <div className={`col-4 d-flex justify-content-center`}>
                    <div>{instruction}</div>
                </div>
                <div className={`col-4 d-flex justify-content-center`}>
                    <img src="" alt="Mini Echo"/>
                </div>
            </div>
        </div>
    )
}