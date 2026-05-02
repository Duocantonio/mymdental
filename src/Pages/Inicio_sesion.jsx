import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Styles/Inicio_sesion.css"

export default function InicioSesion() {

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");



  const navigate= useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:8080/MyMDentalCommerce/session/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({ 
                emailUser: correo,  
                password: password
            })
        });

        if (!response.ok) {
            throw new Error('Credenciales incorrectas');
        }

        const data = await response.json();
        console.log("Respuesta:", data)

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        alert("Login correcto");
        navigate("/");

    } catch (error) {
        console.error(error);
        alert("Error al iniciar sesión");
    }
};

  return (
    <>
    <div className='login-page'>
      <form onSubmit={handleSubmit} className='form-container'>
        <div className='form-title'>Inicio de sesión</div>

        <input 
        className='form-input'
          type="text" 
          placeholder="correo" 
          value={correo} 
          onChange={(e) => setCorreo(e.target.value)} 
        />

        <input 
        className='form-input'
          type="password" 
          placeholder="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />

        <button type="submit" class="form-button"
        >Iniciar Sesión</button>
      <p className='register-link'>¿No tienes una cuenta? <a href="/crear_cuenta">Crear cuenta</a></p>
      
      </form>
      
    </div> </>
  );
}