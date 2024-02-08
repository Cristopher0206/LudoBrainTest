import {Inter} from 'next/font/google'
import Login from "@/pages/login";
import styles from "@/styles/styles.module.css";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    return (
        <main className={`min-h-screen ${styles.bg_robot_image}`}>
            <Login></Login>
        </main>
    )
}
