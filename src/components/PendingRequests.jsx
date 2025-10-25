import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { solicitudesApi } from "../services/api";
import "../styles/PendingRequests.css";

// Mapeo de tipos de solicitud
const TIPOS_SOLICITUD = {
  1: "Vacaciones",
  2: "Maternidad",
  3: "Paternidad",
  4: "Incapacidad",
  5: "Otro"
};

function PendingRequests({ onAction, searchTerm = "" }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionInProgress, setActionInProgress] = useState(false);

  useEffect(() => {
    let mounted = true;
    const cargarSolicitudesPendientes = async () => {
      try {
        setLoading(true);
        setError(null);
        const solicitudes = await solicitudesApi.obtenerPendientes();
        if (!mounted) return;

        const solicitudesFormateadas = solicitudes.map(s => {
          const emp = s.empleado || {};
          const nombre = `${emp.nombre || ""} ${emp.apellido || ""}`.trim();
          return {
            id: s.id,
            nombre,
            cargo: emp.cargo || "",
            tipo: TIPOS_SOLICITUD[s.tipoSolicitudId] || String(s.tipoSolicitudId),
            inicio: s.fechaInicio ? new Date(s.fechaInicio).toLocaleDateString() : "",
            fin: s.fechaFin ? new Date(s.fechaFin).toLocaleDateString() : "",
            dias: s.fechaInicio && s.fechaFin
              ? Math.ceil((new Date(s.fechaFin) - new Date(s.fechaInicio)) / (1000 * 60 * 60 * 24)) + 1
              : 0,
            comentarios: s.motivo || "",
            contacto: emp.telefono || "No disponible",
            estado: s.estado || "pendiente"
          };
        });
        
        setRequests(solicitudesFormateadas);
      } catch (err) {
        if (mounted) {
          setError(err.message || String(err));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    cargarSolicitudesPendientes();
    return () => {
      mounted = false;
    };
  }, []);

  const handleAction = async (id, action) => {
    if (actionInProgress) return;
    
    if (!window.confirm(`¿Está seguro que desea ${action} esta solicitud?`)) {
      return;
    }

    try {
      setActionInProgress(true);
      
      // Realizar la acción en el backend
      let success = false;
      switch (action) {
        case "aprobado":
          success = await solicitudesApi.aprobarSolicitud(id);
          break;
        case "rechazado":
          success = await solicitudesApi.rechazarSolicitud(id);
          break;
        case "eliminado":
          success = await solicitudesApi.eliminarSolicitud(id);
          break;
        default:
          throw new Error("Acción no válida");
      }

      if (success) {
        // Actualizar estado local
        setRequests(prev => prev.filter(r => r.id !== id));
        
        // Notificar al componente padre
        const req = requests.find(r => r.id === id);
        if (req && onAction) {
          onAction(
            action === "aprobado"
              ? "approve"
              : action === "rechazado"
              ? "reject"
              : "delete",
            req.nombre
          );
        }
      }
    } catch (err) {
      setError(`Error al ${action} la solicitud: ${err.message}`);
    } finally {
      setActionInProgress(false);
    }
  };

  const filteredRequests = searchTerm
    ? requests.filter(req =>
        (req.nombre || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (req.tipo || "").toLowerCase().includes(searchTerm.toLowerCase())
      )
    : requests;

  return (
    <div className="pending-list">
      {loading && (
        <div className="loading-state">
          <FaSpinner className="spinner" />
          <p>Cargando solicitudes pendientes...</p>
        </div>
      )}

      {error && (
        <div className="error-state">
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()}>Reintentar</button>
        </div>
      )}

      {!loading && !error && filteredRequests.length === 0 && (
        <div className="empty-state">
          No hay solicitudes pendientes{searchTerm ? " que coincidan con la búsqueda" : ""}.
        </div>
      )}

      {!loading && !error && filteredRequests.map(req => (
        <div 
          key={req.id} 
          className={`pending-card ${req.estado || ""}`}
        >
          <div className="pending-header">
            <div className="pending-info">
              <span className="pending-icon">📬</span>
              <h4>{req.nombre}</h4>
              <small>{req.cargo}</small>
            </div>
          </div>

          <div className="pending-body">
            <p><strong>Tipo:</strong> {req.tipo}</p>
            <p><strong>Periodo:</strong> {req.inicio} → {req.fin}</p>
            <p><strong>Días Totales:</strong> {req.dias}</p>
            <p><strong>Comentarios:</strong> {req.comentarios}</p>
            <p><strong>Contacto:</strong> <a href={`tel:${req.contacto}`}>{req.contacto}</a></p>
          </div>

          <div className="pending-actions">
            <button
              className="pending-approve"
              onClick={() => handleAction(req.id, "aprobado")}
              disabled={actionInProgress}
            >
              {actionInProgress ? 'Procesando...' : 'Aprobar'}
            </button>
            <button
              className="pending-reject"
              onClick={() => handleAction(req.id, "rechazado")}
              disabled={actionInProgress}
            >
              {actionInProgress ? 'Procesando...' : 'Rechazar'}
            </button>
            <button
              className="pending-delete"
              onClick={() => handleAction(req.id, "eliminado")}
              disabled={actionInProgress}
            >
              {actionInProgress ? 'Procesando...' : 'Eliminar'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PendingRequests;
