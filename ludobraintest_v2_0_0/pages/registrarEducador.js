import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import InstructionBar from "@/components/InstructionBar";

export default function RegistrarEducador() {
    const router = useRouter();
    /*------------------- ESTADOS -------------------*/
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [successMessage, setSuccessMessage] = useState(false); // Estado para el mensaje de registro
    const [warningMessage, setWarningMessage] = useState(false); // Estado para la advertencia de registro
    /*------------------- EFECTOS -------------------*/
    /*------------------- FUNCIONES -------------------*/
    const clearFields = () => { /* Funciòn para limpiar los campos */
        setUsuario('');
        setNombre('');
        setApellido('');
        setPassword('');
    };
    const registrarEducador = () => {
        axios({
            method: "post",
            data: {
                usuario: usuario,
                user_password: password,
                nombre: nombre,
                apellido: apellido,
            },
            withCredentials: true,
            url: "http://localhost:3001/registrarEducador"
        }).then(res => {
            console.log(res);
            if (res.data.message === 'Usuario creado correctamente') {
                // Si el usuario se crea, muestra un mensaje de confirmacion
                setSuccessMessage(true);
                // El mensaje desaparece luego de 3 segundos
                setTimeout(() => {
                    setSuccessMessage(false);
                    router.push('/');
                }, 3000);
            } else if (res.data.message === 'El usuario ya se encuentra registrado') {
                // Si el usuario ya existe, muestra un mensaje de advertencia
                setWarningMessage(true);
                // El mensaje desaparece luego de 3 segundos
                setTimeout(() => {
                    setWarningMessage(false);
                }, 3000);
                clearFields();
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <InstructionBar previousPage={`/`}
                            instruction={`¡Regístrate!`}/>
            <div className={`container-fluid border-2 border-black p-0`}>
                <div className={`container-fluid text-black`}>
                    <br/>
                    <label>Nombre</label>
                    <br/>
                    <input value={nombre}
                           type="text"
                           onChange={e => setNombre(e.target.value)}/>
                    <br/><br/>
                    <label>Apellido</label>
                    <br/>
                    <input value={apellido}
                           type="text"
                           onChange={e => setApellido(e.target.value)}/>
                    <br/><br/>
                    <label>Usuario (Corrreo Electrónico)</label>
                    <br/>
                    <input value={usuario}
                           type="text"
                           placeholder={`example@gmail.com`}
                           onChange={e => setUsuario(e.target.value)}/>
                    <br/><br/>
                    <label>Contraseña</label>
                    <br/>
                    <input value={password}
                           type="password"
                           onChange={e => setPassword(e.target.value)}/>
                    {successMessage && (
                        <div>
                            <br/>
                            <div className="alert alert-success d-flex justify-content-center" role="alert">
                                ¡Educador registrado Exitosamente!
                            </div>
                        </div>
                    )}
                    {warningMessage && (
                        <div>
                            <br/>
                            <div className="alert alert-warning d-flex justify-content-center" role="alert">
                                ¡Este educador ya se encuentra registrado!
                            </div>
                        </div>
                    )}
                    <br/><br/>
                    <button onClick={registrarEducador} className={`btn btn-primary`}>Registrar</button>
                    <br/>
                </div>
            </div>
        </main>
    )
}