import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SolicitarPermisos from "./pages/SolicitarPermisos";
import VerMisPermisos from "./pages/VerMisPermisos";
import CalendarioEquipo from "./pages/CalendarioEquipo";
import PanelAdmin from "./pages/PanelAdmin"; // ✅ importamos el panel

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/solicitar-permisos" element={<SolicitarPermisos />} />
        <Route path="/ver-mis-permisos" element={<VerMisPermisos />} />
        <Route path="/ver-calendario" element={<CalendarioEquipo />} />
        <Route path="/panel-admin" element={<PanelAdmin />} /> {/* ✅ nueva ruta */}
      </Routes>
    </Router>
  );
}

export default App;
