import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import logo from "../assets/images/comfachoco-logo.png";

function Login() {
  const [userType, setUserType] = useState("persona");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Redirección condicional según el tipo de usuario
    if (userType === "admin") {
      navigate("/panel-admin"); // ✅ supervisor
    } else {
      navigate("/dashboard"); // ✅ persona normal
    }
  };

  return (
    <div className="login-container">
      <div className="background-logo">
        <img src={logo} alt="Fondo Comfachocó" />
      </div>

      <div className="login-box">
        <img src={logo} alt="Logo Comfachocó" className="logo" />
        <h1>Sistema de Gestión de Permisos</h1>
        <p className="subtitle">COMFACHOCÓ - Ingresa tus credenciales</p>

        <div className="role-selector">
          <label
            className={`role-option ${userType === "persona" ? "active" : ""}`}
            onClick={() => setUserType("persona")}
          >
            <span className="custom-radio" />
            <div>
              <strong>Persona Natural</strong>
              <p>Empleados y supervisores</p>
            </div>
          </label>

          <label
            className={`role-option ${userType === "admin" ? "active" : ""}`}
            onClick={() => setUserType("admin")}
          >
            <span className="custom-radio" />
            <div>
              <strong>Supervisor</strong>
              <p>Control total del sistema</p>
            </div>
          </label>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <input type="text" placeholder="Ingresa tu usuario" required />
          <input type="password" placeholder="Ingresa tu contraseña" required />
          <p className="hint">
            Usa “supervisor” como usuario para acceder como supervisor.
          </p>
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
