import React, {useEffect, useState} from "react";


export default function Crear_cuenta() {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [telefono, setTelefono] = useState("");
    const [errores, setErrores] = useState(null);


    const manejarSubmit = (e) => {
        e.preventDefault();
        setErrores("");
        
        if(nombre.length<3){
            setErrores("El nombre debe tener al menos 3 caracteres");
            return;
        }
        if(apellido.length<3){
            setErrores("El apellido debe tener al menos 3 caracteres");
            return;
        }

        if (!email.includes("@gmail.com") && !email.includes("@hotmail.com")) {
            setErrores("El email no es válido");
            return;
        }

        if (email.length<6){
            setErrores("El email debe tener al menos 6 caracteres");
            return;
        }

        if(password.length<6){
            setErrores("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        if(password !==password2){
            setErrores("Las contraseñas no coinciden");
            return;
        }
        if (telefono.length !== 9) {
            setErrores("El teléfono debe tener 9 dígitos");
            return;
        }
    };

    return (
    <form onSubmit={manejarSubmit}>
    <div>Formulario</div>

    <input 
        type="text" 
        placeholder="Nombre" 
        value={nombre} 
        onChange={(e) => setNombre(e.target.value)} 
    />
    <input 
        type="text" 
        placeholder="Apellido" 
        value={apellido} 
        onChange={(e) => setApellido(e.target.value)} 
    />
    <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
    />
    <input 
        type="password" 
        placeholder="Contraseña" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
    />

    <input 
        type="password" 
        placeholder="Repetir Contraseña" 
        value={password2} 
        onChange={(e) => setPassword2(e.target.value)} 
    />

    <input 
        type="number" 
        placeholder="Teléfono" 
        value={telefono} 
        onChange={(e) => setTelefono(e.target.value)} 
    />

    <button type="submit">Crear Cuenta</button>
    {errores && <p>{errores}</p>}
    </form>

  )
}
