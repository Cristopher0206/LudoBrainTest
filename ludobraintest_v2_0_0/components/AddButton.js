import Link from "next/link";

export default function AddButton({createPage, color}){
    return (
        <div className={`container-fluid d-flex justify-content-center`}>
            <Link href={createPage}>
                <button type={`button`} className={`${color} rounded-full px-3 py-1 font-bold text-white
                drop-shadow-sm border-2 border-black border-opacity-10`}>
                    <h1>+</h1>
                </button>
            </Link>
        </div>
    )
}