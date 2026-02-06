import './Sidebar.css';
import logo from '../../assets/logoagroamigo.png';
import { useState } from 'react';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside id="sidebar" className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <img src={logo} alt="AgroAmigo Logo" className="sidebar-logo" />
      </div>

      <ul className="nav flex-column sidebar-menu">
        <li className="nav-item">
          <a className="nav-link active" href="#">
            <i className="bi bi-grid"></i>
            <span>Panel</span>
          </a>
        </li>

        <li className="nav-item divider"></li>

        <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="bi bi-leaf"></i>
            <span>Cultivos</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="bi bi-droplet"></i>
            <span>Fertilizantes</span>
          </a>
        </li>

        <li className="nav-item divider"></li>

        <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="bi bi-chat"></i>
            <span>Mensajes</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="bi bi-lightbulb"></i>
            <span>Recomendaciones</span>
          </a>
        </li>

        <li className="nav-item divider"></li>

        <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="bi bi-people"></i>
            <span>Usuarios</span>
          </a>
        </li>
      </ul>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="btn btn-light sidebar-toggle"
      >
        <i className={`bi ${collapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}></i>
      </button>
    </aside>
  );
}
