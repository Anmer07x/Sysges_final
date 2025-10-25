import React, { useState } from "react";
import "../styles/Home.css";
import {
  FaFileAlt,
  FaFolderOpen,
  FaCalendarAlt,
  FaSignOutAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/fondo.png";
import helpImage from "../assets/images/Homehelp.png"; // o tu imagen de ayuda

const DashboardEmpleado = ({ nombre = "Andrea", diasDisponibles = 15 }) => {
  const navigate = useNavigate();
  const [showHelp, setShowHelp] = useState(false);

  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <div className="dashboard-header">
        <div className="header-info">
          <div className="logo-title">
            <img src={logo} alt="Logo" className="header-logo" />
            <h2 className="titulo-panel">Panel Principal del Empleado</h2>
          </div>
          <p className="bienvenida">Bienvenido, {nombre}</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Cerrar Sesión
        </button>
      </div>

      {/* SALDO */}
      <div className="saldo-card animate-card">
        <p className="saldo-titulo">Saldo de Días Disponibles</p>
        <p className="saldo-subtitulo">Tu balance actual de días de permiso</p>
        <h1 className="saldo-numero">{diasDisponibles}</h1>
        <p className="saldo-descripcion">días disponibles</p>
      </div>

      {/* ACCIONES */}
      <div className="acciones-container">
        <div
          className="accion-card animate-card"
          onClick={() => navigate("/solicitar-permisos")}
        >
          <FaFileAlt className="icono" />
          <h3>Solicitar Permisos</h3>
          <p>Crear nueva solicitud de permiso o licencia</p>
        </div>

        <div
          className="accion-card animate-card"
          onClick={() => navigate("/ver-mis-permisos")}
        >
          <FaFolderOpen className="icono" />
          <h3>Ver Mis Permisos</h3>
          <p>Consulta el historial de tus solicitudes</p>
        </div>

        <div
          className="accion-card animate-card"
          onClick={() => navigate("/ver-calendario")}
        >
          <FaCalendarAlt className="icono" />
          <h3>Ver Calendario del Equipo</h3>
          <p>Visualiza la disponibilidad del equipo</p>
        </div>
      </div>

      {/* SOLICITUDES */}
      <div className="solicitudes-card animate-card">
        <h4>Solicitudes Recientes</h4>
        <p>Últimas solicitudes realizadas</p>
        <div className="solicitud-item">
          <div>
            <p className="solicitud-titulo">Maternidad</p>
            <p className="solicitud-fecha">
              2025-10-25 - 2025-10-25 (1 día)
            </p>
          </div>
          <span className="estado-pendiente">pendiente</span>
        </div>
      </div>

      {/* ===== BOTÓN DE AYUDA FLOTANTE ===== */}
      <button className="dashboard-help-btn" onClick={() => setShowHelp(true)}>
        <FaQuestionCircle />
      </button>

      {/* ===== MODAL DE AYUDA ===== */}
      {showHelp && (
        <div className="dashboard-help-modal" onClick={() => setShowHelp(false)}>
          <div
            className="dashboard-help-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={helpImage} alt="Ayuda del sistema" />
            <button
              className="dashboard-close-btn"
              onClick={() => setShowHelp(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardEmpleado;
