
import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "../../styles/index.css"; // CSS global

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="d-flex">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className="main-content">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-semibold">Panel General</h4>
          <button
            className="btn btn-outline-success d-md-none"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <i className="bi bi-list"></i>
          </button>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="metric-card">
              <h6>Cultivos activos</h6>
              <h3>18</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="metric-card">
              <h6>Fertilizantes</h6>
              <h3>12</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="metric-card">
              <h6>Recomendaciones</h6>
              <h3>7</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="metric-card">
              <h6>Usuarios</h6>
              <h3>4</h3>
            </div>
          </div>
        </div>

        <div className="table-card">
          <h6 className="mb-3 fw-semibold">Últimos cultivos registrados</h6>
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Cultivo</th>
                <th>Tipo</th>
                <th>Fecha</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Maíz</td>
                <td>Cereal</td>
                <td>2026-02-01</td>
                <td><span className="badge bg-success-subtle text-success">Activo</span></td>
              </tr>
              <tr>
                <td>Tomate</td>
                <td>Hortaliza</td>
                <td>2026-01-28</td>
                <td><span className="badge bg-warning-subtle text-warning">Seguimiento</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
