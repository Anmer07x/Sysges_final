import React, { useEffect, useState } from "react";
import "../styles/VerMisPermisos.css";
import { FaArrowLeft, FaPaperclip, FaCheckCircle, FaQuestionCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/fondo.png"; // logo institucional
import helpImage from "../assets/images/verpermisos.png"; // 🔹 imagen de ayuda

const VerMisPermisos = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [permisos, setPermisos] = useState([]);
  const [showHelp, setShowHelp] = useState(false); // 🔹 estado del modal de ayuda

  // Simulamos carga desde backend
  useEffect(() => {
    setTimeout(() => {
      setPermisos([
        {
          id: 1,
          tipo: "Maternidad",
          fechaInicio: "2025-10-25",
          fechaFin: "2025-10-25",
          dias: 1,
          comentarios: "bebrthtrhtrtsggtbtrbsrthesrhethrthtrhthrhrhht",
          archivo: "cpnfachoco.png",
          estado: "pendiente",
        },
        {
          id: 2,
          tipo: "Vacaciones",
          fechaInicio: "2025-12-10",
          fechaFin: "2025-12-20",
          dias: 10,
          comentarios: "Vacaciones familiares programadas",
          archivo: "permiso_vacaciones.pdf",
          estado: "aprobado",
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="verpermisos-container">
      {/* Fondo con logo */}
      <div className="background-logo-container">
        <img src={logo} alt="Fondo Logo" className="background-logo" />
      </div>

      {/* Pantalla de carga */}
      {loading && (
        <div className="loading-overlay">
          <img src={logo} alt="Cargando..." className="loading-logo" />
          <p className="loading-text">Cargando tus permisos...</p>
          <div className="loader"></div>
        </div>
      )}

      {/* Contenido principal */}
      {!loading && (
        <div className="verpermisos-card animate-form">
          <button className="volver-btn" onClick={() => navigate("/dashboard")}>
            <FaArrowLeft /> Volver al Panel
          </button>

          <h2>Mis Permisos</h2>
          <p className="subtitulo">
            Aquí puedes revisar tus solicitudes y su estado actual.
          </p>

          {permisos.map((permiso, index) => (
            <div
              key={permiso.id}
              className={`permiso-item animate-permiso`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="permiso-info">
                <p className="permiso-titulo">{permiso.tipo}</p>
                <p className="permiso-fecha">
                  {permiso.fechaInicio} - {permiso.fechaFin} ({permiso.dias}{" "}
                  día{permiso.dias > 1 ? "s" : ""})
                </p>
                <p className="permiso-comentarios">{permiso.comentarios}</p>
                <div className="permiso-archivo">
                  <FaPaperclip className="icono-archivo" />
                  <span>{permiso.archivo}</span>
                </div>
              </div>
              <span
                className={`estado ${
                  permiso.estado === "pendiente" ? "pendiente" : "aprobado"
                }`}
              >
                {permiso.estado === "aprobado" && <FaCheckCircle />}{" "}
                {permiso.estado}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* 🔹 BOTÓN FLOTANTE DE AYUDA */}
      <button className="help-permisos-btn" onClick={() => setShowHelp(true)}>
        <FaQuestionCircle />
      </button>

      {/* 🔹 MODAL DE AYUDA */}
      {showHelp && (
        <div className="help-permisos-modal" onClick={() => setShowHelp(false)}>
          <div
            className="help-permisos-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={helpImage} alt="Ayuda sobre permisos" />
            <button
              className="help-permisos-close"
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

export default VerMisPermisos;
