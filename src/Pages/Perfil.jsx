import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const API_9 = import.meta.env.VITE_API_9;

export default function Perfil() {
    const [user, setUser] = useState({});

    useEffect(() => {
            const email = localStorage.getItem("useremail");
    
    
            fetch(`${API_9}/${email}`, {
                method: "GET",
                credentials: "include"
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Error ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    setUser(data);
                    console.log("Datos del usuario:", data);
                })
                .catch(err => {
                    console.error("Fallo al obtener los datos del usuario:", err);
                });
        }, []);

  return (
    <>
    <div className="container">
        <h1 className="tittle">Perfil</h1>
        <div className="container-form">
           <div className="container-form-left">
            <p>Nombre:</p>
            
            </div>
        </div>


    </div>

    

    <button onClick={() => window.location.href = "/EditarDatos"}>Editar Datos</button>
    </>
  )
}

/*
    <p><strong>Nombre:</strong> {user.nameUser}</p>
    <p><strong>Apellido:</strong> {user.surnameUser}</p>
    <p><strong>Celular:</strong> {user.cellphoneUser}</p>
    <p><strong>Email:</strong> {user.emailUser}</p>*/