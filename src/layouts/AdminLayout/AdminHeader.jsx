
import './AdminHeader.css';

export default function AdminHeader({ onMenuClick }) {
  return (
    <header className="admin-header d-flex align-items-center px-3">
      {/* Botón hamburguesa - solo móvil */}
      <button
        className="mobile-toggle d-md-none me-3"
        onClick={onMenuClick}
        aria-label="Abrir menú"
      >
        ☰
      </button>

      {/* Título o breadcrumbs (opcional por página) */}
      <div className="header-spacer flex-grow-1" />

      {/* Futuro: usuario / notificaciones */}
      {/* <UserMenu /> */}
    </header>
  );
}
