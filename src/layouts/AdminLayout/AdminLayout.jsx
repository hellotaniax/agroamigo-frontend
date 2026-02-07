
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import AdminHeader from './AdminHeader';
import './AdminLayout.css';

export default function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="admin-layout d-flex">
      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Área principal */}
      <div className="content-area flex-grow-1">
        <AdminHeader onMenuClick={() => setMobileOpen(true)} />

        <main className="main-content">
          {children}
        </main>
      </div>

      {/* Overlay móvil */}
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </div>
  );
}
