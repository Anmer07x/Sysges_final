import React, { useState, useEffect } from "react";
import "../styles/SolicitarPermisos.css";
import {
  FaArrowLeft,
  FaPaperPlane,
  FaUpload,
  FaCheckCircle,
  FaQuestionCircle,
  FaFilePdf,
  
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/fondo.png";
import helpImage from "../assets/images/permisoshelp.png"; // o tu imagen de ayuda

const diasDisponiblesPorTipo = {
  Vacaciones: 14,
  Enfermedad: 30,
  Maternidad: 126,
  Paternidad: 11,
  Otro: 0,
};

const SolicitarPermisos = () => {
  const navigate = useNavigate();
  const [tipo, setTipo] = useState("Vacaciones");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [archivoPreview, setArchivoPreview] = useState(null);
  const [comentarios, setComentarios] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [diasSeleccionados, setDiasSeleccionados] = useState(0);
  const [maxFechaFin, setMaxFechaFin] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    if (fechaInicio && fechaFin) {
      const inicio = new Date(fechaInicio);
      const fin = new Date(fechaFin);
      const diffTime = fin.getTime() - inicio.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setDiasSeleccionados(diffDays);

      const maxDias = diasDisponiblesPorTipo[tipo];
      const fechaMax = new Date(inicio);
      fechaMax.setDate(fechaMax.getDate() + maxDias - 1);
      setMaxFechaFin(fechaMax.toISOString().split("T")[0]);
    } else {
      setDiasSeleccionados(0);
      setMaxFechaFin("");
    }
  }, [fechaInicio, fechaFin, tipo]);

  // Vista previa del archivo subido
  const handleArchivoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArchivo(file);
      const fileType = file.type;

      if (fileType.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => setArchivoPreview(reader.result);
        reader.readAsDataURL(file);
      } else if (fileType === "application/pdf") {
        setArchivoPreview("PDF_PREVIEW");
      } else {
        setArchivoPreview(null);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (diasSeleccionados > diasDisponiblesPorTipo[tipo]) {
      alert(
        `No puedes solicitar más de ${diasDisponiblesPorTipo[tipo]} días para ${tipo}`
      );
      return;
    }

    setLoading(true);
    setSuccess(false);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTipo("Vacaciones");
      setFechaInicio("");
      setFechaFin("");
      setArchivo(null);
      setArchivoPreview(null);
      setComentarios("");
      setDiasSeleccionados(0);

      // 🔹 Redirección automática al dashboard
      setTimeout(() => navigate("/dashboard"), 4000);
    }, 2500);
  };

  return (
    <div className="solicitar-container">
      <div className="background-logo-container">
        <img src={logo} alt="Logo de fondo" className="background-logo" />
      </div>

      {loading && (
        <div className="overlay-carga">
          <div className="spinner">
            <img src={logo} alt="Logo cargando" className="spinner-logo" />
            <p>Enviando documento...</p>
          </div>
        </div>
      )}

      {success && (
        <div className="banner-exito animate-banner">
          <FaCheckCircle className="icono-exito" />
          <p>✅ Tu documento ha sido enviado correctamente</p>
        </div>
      )}

      <div className="formulario-card animate-form">
        <div className="logo-formulario">
          <img src={logo} alt="Logo institucional" />
        </div>

        <button className="volver-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Volver
        </button>

        <h2>Formulario de Solicitud</h2>
        <p className="subtitulo">
          Completa todos los campos para enviar tu solicitud
        </p>

        <form onSubmit={handleSubmit}>
          <p className="form-seccion-titulo">Nueva Solicitud de Permiso</p>
          <small>Todos los campos marcados con * son obligatorios</small>

          <label>Tipo de Permiso *</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            {Object.keys(diasDisponiblesPorTipo).map((permiso) => (
              <option key={permiso}>{permiso}</option>
            ))}
          </select>
          <small>Días disponibles: {diasDisponiblesPorTipo[tipo]}</small>

          <div className="fechas-container">
            <div>
              <label>Fecha de Inicio *</label>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div>
              <label>Fecha de Fin *</label>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                required
                min={fechaInicio || new Date().toISOString().split("T")[0]}
                max={maxFechaFin || undefined}
              />
              {diasSeleccionados > diasDisponiblesPorTipo[tipo] && (
                <small className="error-text">
                  ⚠️ Excede los días disponibles ({diasDisponiblesPorTipo[tipo]}
                  )
                </small>
              )}
            </div>
          </div>

          <label>Subir Archivo del Permiso</label>
          <div className="upload-container">
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.png"
              onChange={handleArchivoChange}
            />
            <FaUpload className="upload-icon" />
            <span>Haz clic para seleccionar un archivo (Máx. 10MB)</span>
          </div>

          {/* 🔹 Vista previa del archivo */}
          {archivoPreview && (
            <div className="preview-container">
              <p>Vista previa del archivo:</p>
              {archivoPreview === "PDF_PREVIEW" ? (
                <div className="pdf-preview">
                  <FaFilePdf className="pdf-icon" />
                  <span>{archivo?.name}</span>
                </div>
              ) : (
                <img
                  src={archivoPreview}
                  alt="Vista previa"
                  className="archivo-preview-img"
                />
              )}
            </div>
          )}

          <label>Comentarios *</label>
          <textarea
            placeholder="Describe el motivo de tu solicitud de permiso..."
            value={comentarios}
            onChange={(e) => setComentarios(e.target.value)}
            required
          />

          <button type="submit" className="enviar-btn">
            <FaPaperPlane /> Enviar Solicitud
          </button>
        </form>
      </div>

      {/* ===== BOTÓN DE AYUDA FLOTANTE ===== */}
      <button className="dashboard-help-btn" onClick={() => setShowHelp(true)}>
        <FaQuestionCircle />
      </button>

      {/* ===== MODAL DE AYUDA ===== */}
      {showHelp && (
        <div
          className="dashboard-help-modal"
          onClick={() => setShowHelp(false)}
        >
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

export default SolicitarPermisos;
