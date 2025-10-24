// src/components/AuthorizedList.jsx
import React, { useState } from "react";
import { permisosAutorizadosData } from "../data/data";
import "../styles/PendingRequests.css"; // Reutilizamos el mismo CSS para cards

function AuthorizedList({ onAction }) {
  const [requests, setRequests] = useState(permisosAutorizadosData);

  const handleAction = (id, action) => {
    const updated = requests.map(r =>
      r.id === id ? { ...r, estado: action } : r
    );
    setRequests(updated);
    const req = requests.find(r => r.id === id);
    if (req) onAction(action === "aprobado" ? "approve" : "delete", req.nombre);
  };

  return (
    <div className="pending-list">
      {requests.map((req) => (
        <div key={req.id} className="pending-card">
          <div className="pending-header">
            <div className="pending-info">
              <span className="pending-icon">✅</span>
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
            <button className="pending-delete" onClick={() => handleAction(req.id, "eliminado")}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AuthorizedList;
