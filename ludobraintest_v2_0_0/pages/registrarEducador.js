import UpperBar from "@/components/UpperBar";
import {useState} from "react";
import axios from "axios";

export default function RegistrarEducador() {
    /* Estados para el usuario y la contraseña */
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    /* Funciones */
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
        }).then((res) => {
            console.log("Exitoso",res);
        }).catch((err) => {
            console.log("No Exitoso",err);
        })
    }
    return (
        <div className={`container-fluid border-2 border-black p-0`}>
            <UpperBar></UpperBar>
            <div className={`container-fluid text-black`}>
                <br/>
                <label>Nombre</label>
                <br/>
                <input name={`nombre`}
                       type="text"
                       onChange={e => setNombre(e.target.value)}/>
                <br/><br/>
                <label>Apellido</label>
                <br/>
                <input name={`apellido`}
                       type="text"
                       onChange={e => setApellido(e.target.value)}/>
                <br/><br/>
                <label>Usuario (Corrreo Electrónico)</label>
                <br/>
                <input name={`usuario`}
                       type="text"
                       placeholder={`example@gmail.com`}
                       onChange={e => setUsuario(e.target.value)}/>
                <br/><br/>
                <label>Contraseña</label>
                <br/>
                <input name={`user_password`}
                       type="password"
                       onChange={e => setPassword(e.target.value)}/>
                <br/><br/>
                <button onClick={registrarEducador} className={`btn btn-primary`}>Registrar</button>
                <br/>
            </div>
        </div>
    )
}