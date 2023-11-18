import Image from 'next/image'
import {Inter} from 'next/font/google'
import Login from "@/pages/login";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <Login></Login>
        </main>
    )
}
