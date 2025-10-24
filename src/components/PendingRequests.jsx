import React, { useState } from "react";
import { pendingRequestsData } from "../data/data"; // Corrige la importación
import "../styles/PendingRequests.css";

function PendingRequests({ onAction }) {
  const [requests, setRequests] = useState(pendingRequestsData);

  const handleAction = (id, action) => {
    const updated = requests.map((r) =>
      r.id === id ? { ...r, estado: action } : r
    );
    setRequests(updated);

    const req = requests.find((r) => r.id === id);
    if (req) {
      onAction(
        action === "aprobado"
          ? "approve"
          : action === "rechazado"
          ? "reject"
          : "delete",
        req.nombre
      );
    }
  };

  return (
    <div className="pending-list">
      {requests.map((req) => (
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
            >
              Aprobar
            </button>
            <button
              className="pending-reject"
              onClick={() => handleAction(req.id, "rechazado")}
            >
              Rechazar
            </button>
            <button
              className="pending-delete"
              onClick={() => handleAction(req.id, "eliminado")}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PendingRequests;
