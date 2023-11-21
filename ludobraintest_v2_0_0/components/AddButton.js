import Link from "next/link";

export default function AddButton({createPage, color}){
    return (
        <div className={`container-fluid d-flex justify-content-center border-2 border-black`}>
            <Link href={createPage}>
                <button type={`button`} className={`${color} rounded-full px-2 
                                                        font-bold text-black`}>
                    +
                </button>
            </Link>
        </div>
    )
}