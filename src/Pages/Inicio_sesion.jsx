import React from 'react';
import { useState } from 'react';

export default function InicioSesion() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Correo:", correo);
    console.log("Contraseña:", contraseña);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>Inicio de sesión</div>

        <input 
          type="text" 
          placeholder="correo" 
          value={correo} 
          onChange={(e) => setCorreo(e.target.value)} 
        />

        <input 
          type="password" 
          placeholder="contraseña" 
          value={contraseña} 
          onChange={(e) => setContraseña(e.target.value)} 
        />

        <button type="submit">Iniciar Sesión</button>
      </form>

      <p>¿No tienes una cuenta? <a href="/crear_cuenta">Crear cuenta</a></p>
    </>
  );
}