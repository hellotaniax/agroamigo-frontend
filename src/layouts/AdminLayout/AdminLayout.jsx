import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import './AdminLayout.css';

export default function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="admin-layout d-flex">
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <main className="main-content">
        {/* Botón hamburguesa SOLO móvil */}
        <button
          className="mobile-toggle d-md-none"
          onClick={() => setMobileOpen(true)}
        >
          ☰
        </button>

        {children}
      </main>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </div>
  );
}
