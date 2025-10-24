import React, { useState } from "react";
import AuthorizedList from "../components/AuthorizedList";
import PendingRequests from "../components/PendingRequests";
import SummaryCards from "../components/SummaryCards";
import fondo from "../assets/images/fondo.png";
import logo from "../assets/images/comfachoco-logo.png";
import "../styles/PanelAdmin.css";

function PanelAdmin() {
  const [activeTab, setActiveTab] = useState("autorizados");
  const [notifications, setNotifications] = useState(2);
  const [modal, setModal] = useState({ open: false, type: "", message: "" });

  const handleAction = (type, name) => {
    let message = "";
    if (type === "approve") message = `Has aprobado el permiso de ${name}.`;
    if (type === "reject") message = `Has rechazado el permiso de ${name}.`;
    if (type === "delete") message = `Has eliminado el permiso de ${name}.`;

    setModal({ open: true, type, message });
  };

  return (
    <div
      className="panel-admin"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="overlay">
        {/* HEADER */}
        <header className="admin-header">
          <div className="logo-section">
            <img src={logo} alt="Comfachocó" className="admin-logo" />
            <div>
              <h1>Panel de Administración</h1>
              <p>Gestión de permisos y control de empleados</p>
            </div>
          </div>

          <nav>
            <button
              className={activeTab === "autorizados" ? "active" : ""}
              onClick={() => setActiveTab("autorizados")}
            >
              📋 Autorizados
            </button>
            <button
              className={activeTab === "pendientes" ? "active" : ""}
              onClick={() => setActiveTab("pendientes")}
            >
              ⏳ Pendientes
            </button>
            <button className="notif-btn">
              🔔 {notifications > 0 && <span>{notifications}</span>}
            </button>
          </nav>
        </header>

        {/* MAIN */}
        <main className="admin-content">
          <SummaryCards />

          <div className="section-title">
            <h2>
              {activeTab === "autorizados"
                ? "Permisos Autorizados ✅"
                : "Solicitudes Pendientes 📬"}
            </h2>
            <p>
              {activeTab === "autorizados"
                ? "Listado de empleados con permisos aprobados y días restantes"
                : "Solicitudes que requieren revisión y decisión"}
            </p>
          </div>

          <div className="content-area">
            {activeTab === "autorizados" ? (
              <AuthorizedList onAction={handleAction} />
            ) : (
              <PendingRequests onAction={handleAction} />
            )}
          </div>
        </main>

        {/* BOTÓN DE AYUDA */}
        <button
          className="help-button"
          onClick={() =>
            alert(
              "Soporte Técnico Comfachocó:\n📞 123-456-7890\n📧 soporte@comfachoco.com"
            )
          }
        >
          ❓
        </button>

        {/* MODAL */}
        {modal.open && (
          <div className="modal-overlay" onClick={() => setModal({ open: false })}>
            <div
              className={`modal ${modal.type}`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>
                {modal.type === "approve"
                  ? "✅ Aprobado"
                  : modal.type === "reject"
                  ? "❌ Rechazado"
                  : "🗑️ Eliminado"}
              </h3>
              <p>{modal.message}</p>
              <button onClick={() => setModal({ open: false })}>Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PanelAdmin;
