import './Sidebar.css';
import { useState } from 'react';

import SidebarHeader from './SidebarHeader';
import SidebarMenu from './SidebarMenu';
import SidebarToggle from './SidebarToggle';
import useSidebarTooltip from '../../hooks/useSidebarTooltip';

export default function Sidebar({ mobileOpen, onClose }) {
  const [collapsed, setCollapsed] = useState(false);

  useSidebarTooltip(collapsed);

  return (
    <aside
      id="sidebar"
      className={`sidebar 
        ${collapsed ? 'collapsed' : ''} 
        ${mobileOpen ? 'show' : ''}`}
    >
      {/* Botón cerrar (solo móvil) */}
      <button
        className="sidebar-close d-md-none"
        onClick={onClose}
        aria-label="Cerrar menú"
      >
        ✕
      </button>

      <SidebarHeader />
      <SidebarMenu onItemClick={onClose} />

      <SidebarToggle
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />
    </aside>
  );
}

