import './AdminHeader.css';
import BreadcrumbItem from '../BreadcrumbItem';
import authService from '../../services/auth.service';

export default function AdminHeader({ onMenuClick, breadcrumbs = [] }) {
  return (
    <header className="admin-header d-flex flex-column">
      {/* Top: botón hamburguesa y espaciador */}
      <div className="header-top d-flex align-items-center w-100 px-3">
        <button
          className="mobile-toggle d-md-none me-3"
          onClick={onMenuClick}
          aria-label="Abrir menú"
        >
          ☰
        </button>
        <div className="header-spacer flex-grow-1" />
        <div className="header-user d-flex align-items-center">
        <button
          className="btn logout-btn"
          onClick={() => {
            authService.logout();
            // fuerza redirección segura a login
            window.location.replace('/login');
          }}
        >
          <i className="bi bi-box-arrow-right me-2" aria-hidden="true" />
          Cerrar sesión
        </button>
        </div>
        
        {/* Futuro: usuario / notificaciones */}
      </div>

      {/* Bottom: breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav className="breadcrumbs px-3" aria-label="breadcrumb">
          {breadcrumbs.map((item, idx) => (
            <BreadcrumbItem
              key={idx}
              label={item.label}
              link={item.link}
              isLast={idx === breadcrumbs.length - 1}
            />
          ))}
        </nav>
      )}
    </header>
  );
}
