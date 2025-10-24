import React, { useState } from "react";
import "../styles/SolicitarPermisos.css";
import { FaArrowLeft, FaPaperPlane, FaUpload, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/fondo.png";

const SolicitarPermisos = () => {
  const navigate = useNavigate();
  const [tipo, setTipo] = useState("Vacaciones");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [comentarios, setComentarios] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mostrar pantalla de carga
    setLoading(true);
    setSuccess(false);

    // Simulación de envío (esperar 2.5 segundos)
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // ✅ Limpiar todos los campos
      setTipo("Vacaciones");
      setFechaInicio("");
      setFechaFin("");
      setArchivo(null);
      setComentarios("");

      // Ocultar banner después de 4 segundos
      setTimeout(() => setSuccess(false), 4000);
    }, 2500);
  };

  return (
    <div className="solicitar-container">
      {/* Logo de fondo */}
      <div className="background-logo-container">
        <img src={logo} alt="Logo de fondo" className="background-logo" />
      </div>

      {/* Pantalla de carga */}
      {loading && (
        <div className="overlay-carga">
          <div className="spinner">
            <img src={logo} alt="Logo cargando" className="spinner-logo" />
            <p>Enviando documento...</p>
          </div>
        </div>
      )}

      {/* Banner de éxito */}
      {success && (
        <div className="banner-exito animate-banner">
          <FaCheckCircle className="icono-exito" />
          <p>✅ Tu documento ha sido enviado correctamente</p>
        </div>
      )}

      {/* Tarjeta del formulario */}
      <div className="formulario-card animate-form">
        <div className="logo-formulario">
          <img src={logo} alt="Logo institucional" />
        </div>

        <button className="volver-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Volver
        </button>

        <h2>Formulario de Solicitud</h2>
        <p className="subtitulo">Completa todos los campos para enviar tu solicitud</p>

        <form onSubmit={handleSubmit}>
          <p className="form-seccion-titulo">Nueva Solicitud de Permiso</p>
          <small>Todos los campos marcados con * son obligatorios</small>

          {/* Tipo de Permiso */}
          <label>Tipo de Permiso *</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option>Vacaciones</option>
            <option>Enfermedad</option>
            <option>Maternidad</option>
            <option>Paternidad</option>
            <option>Otro</option>
          </select>

          {/* Fechas */}
          <div className="fechas-container">
            <div>
              <label>Fecha de Inicio *</label>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Fecha de Fin *</label>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Subir archivo */}
          <label>Subir Archivo del Permiso</label>
          <div className="upload-container">
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.png"
              onChange={(e) => setArchivo(e.target.files[0])}
            />
            <FaUpload className="upload-icon" />
            <span>Haz clic para seleccionar un archivo (Máx. 10MB)</span>
          </div>
          <small>* Archivo requerido para incapacidades o licencias</small>

          {/* Comentarios */}
          <label>Comentarios *</label>
          <textarea
            placeholder="Describe el motivo de tu solicitud de permiso..."
            value={comentarios}
            onChange={(e) => setComentarios(e.target.value)}
            required
          />

          {/* Enviar */}
          <button type="submit" className="enviar-btn">
            <FaPaperPlane /> Enviar Solicitud
          </button>
        </form>
      </div>
    </div>
  );
};

export default SolicitarPermisos;
