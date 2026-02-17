import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import AdminHeader from '../../components/AdminHeader';
import './AdminLayout.css';

export default function AdminLayout({ children, breadcrumbs = [], hideHeader = false }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="admin-layout d-flex">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="content-area flex-grow-1">
        {!hideHeader && <AdminHeader onMenuClick={() => setMobileOpen(true)} />}

        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav aria-label="breadcrumb" className="px-3 py-2">
            <ol className="breadcrumb mb-3">
              {breadcrumbs.map((bc, idx) => (
                <li
                  key={idx}
                  className={`breadcrumb-item ${idx === breadcrumbs.length - 1 ? 'active' : ''}`}
                  {...(idx === breadcrumbs.length - 1 ? { 'aria-current': 'page' } : {})}
                >
                  {bc.href ? <a href={bc.href}>{bc.label}</a> : bc.label}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <main className="main-content">{children}</main>
      </div>

      {mobileOpen && (
        <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />
      )}
    </div>
  );
}