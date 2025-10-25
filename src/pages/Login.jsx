import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import {
  FaFileAlt,
  FaFolderOpen,
  FaCalendarAlt,
  FaSignOutAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import logo from "../assets/images/comfachoco-logo.png";
import helplogin from "../assets/images/helplogin.png";

function Login() {
  const [userType, setUserType] = useState("persona");
  const [showHelp, setShowHelp] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (userType === "admin") navigate("/panel-admin");
    else navigate("/dashboard");
  };

  return (
    <div className="login-container">
      {/* Fondo difuminado */}
      <div className="background-logo">
        <img src={logo} alt="Fondo Comfachocó" />
      </div>

      {/* Caja principal */}
      <div className="login-box">
        <img src={logo} alt="Logo Comfachocó" className="logo" />
        <h1>Sistema de Gestión de Permisos</h1>
        <p className="subtitle">COMFACHOCÓ - Ingresa tus credenciales</p>

        {/* Selector de rol */}
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

        {/* Formulario */}
        <form className="login-form" onSubmit={handleLogin}>
          <input type="text" placeholder="Ingresa tu usuario" required />
          <input type="password" placeholder="Ingresa tu contraseña" required />
          <p className="hint">
            Usa “supervisor” como usuario para acceder como supervisor.
          </p>
          <button type="submit">Ingresar</button>
        </form>
      </div>

      {/* ✅ Botón flotante de ayuda */}
      <button className="login-help-btn" onClick={() => setShowHelp(true)}>
        <FaQuestionCircle />
      </button>

      {/* ✅ Modal de ayuda */}
      {showHelp && (
        <div className="help-modal" onClick={() => setShowHelp(false)}>
          <div className="help-content" onClick={(e) => e.stopPropagation()}>
            <img src={helplogin} alt="Guía de inicio de sesión" />
            <button className="close-btn" onClick={() => setShowHelp(false)}>
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
