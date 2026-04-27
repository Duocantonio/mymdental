import React, { useEffect, useState } from 'react';

export default function Perfil_usuario() {
    const [userData, setUserData] = useState({
        username: '',
        useremail: '', // Cambié el nombre de la propiedad para que sea igual al storage
        usercellphone: '',
        role: ''
    });

    useEffect(() => {
        // Función para cargar datos
        const cargarDatos = () => {
            const uName = localStorage.getItem("username");
            const uEmail = localStorage.getItem("useremail");
            const uPhone = localStorage.getItem("usercellphone"); // ESPACIOS CORREGIDOS AQUÍ
            const uRole = localStorage.getItem("role");

            console.log("Datos recuperados:", { uName, uEmail, uPhone, uRole });

            setUserData({
                username: uName || "Usuario no encontrado",
                useremail: uEmail || "Email no cargado",
                usercellphone: uPhone || "Sin teléfono",
                role: uRole || "CLIENT"
            });
        };

        cargarDatos();
    }, []);

    // Verificación de seguridad
    if (!localStorage.getItem("token")) {
        return (
            <div className="container mt-5 pt-5 text-center">
                <div className="alert alert-warning">
                    Debe iniciar sesión para acceder a su perfil.
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5 pt-5">
            <div className="card shadow p-4 bg-light">
                <h2 className="mb-4 text-primary">Información de Perfil</h2>
                <hr />
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="fw-bold text-secondary">Nombre de usuario:</label>
                        <p className="border-bottom pb-1 fs-5">{userData.username}</p>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="fw-bold text-secondary">Correo Electrónico:</label>
                        <p className="border-bottom pb-1 fs-5">{userData.useremail}</p>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="fw-bold text-secondary">Teléfono de contacto:</label>
                        <p className="border-bottom pb-1 fs-5">{userData.usercellphone}</p>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="fw-bold text-secondary">Rol asignado:</label>
                        <div>
                            <span className="badge bg-success p-2">{userData.role}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}