import './Sidebar.css';
import logo from '../../assets/img/logoagroamigo.png';
import { useState, useEffect } from 'react';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  // Crear tooltips fijados en el body cuando el sidebar esté colapsado
  useEffect(() => {
    const links = Array.from(document.querySelectorAll('.sidebar-menu .nav-link'));
    let currentTooltip = null;

    function showTooltip(e) {
      const link = e.currentTarget || e.target;
      const text = link.getAttribute('data-tooltip') || link.textContent.trim();
      if (!text) return;
      // Solo mostrar cuando el sidebar está colapsado
      const sidebarEl = document.getElementById('sidebar');
      if (!sidebarEl || !sidebarEl.classList.contains('collapsed')) return;

      // Crear tooltip en body
      const tooltip = document.createElement('div');
      tooltip.className = 'custom-sidebar-tooltip';
      tooltip.textContent = text;
      document.body.appendChild(tooltip);

      // Medir y posicionar (a la derecha del elemento)
      const rect = link.getBoundingClientRect();
      const tRect = tooltip.getBoundingClientRect();
      const top = rect.top + rect.height / 2 - tRect.height / 2;
      const left = rect.right + 12; // 12px de separación

      tooltip.style.top = `${Math.max(8, top)}px`;
      tooltip.style.left = `${left}px`;
      tooltip.style.opacity = '1';
      currentTooltip = tooltip;
    }

    function hideTooltip() {
      if (currentTooltip) {
        currentTooltip.remove();
        currentTooltip = null;
      }
    }

    links.forEach((link) => {
      link.addEventListener('mouseenter', showTooltip);
      link.addEventListener('mouseleave', hideTooltip);
      link.addEventListener('focus', showTooltip);
      link.addEventListener('blur', hideTooltip);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('mouseenter', showTooltip);
        link.removeEventListener('mouseleave', hideTooltip);
        link.removeEventListener('focus', showTooltip);
        link.removeEventListener('blur', hideTooltip);
      });
      hideTooltip();
    };
  }, [collapsed]);

  const menuItems = [
    { icon: 'bi-grid', label: 'Panel', active: true },
    { icon: 'bi-leaf', label: 'Cultivos' },
    { icon: 'bi-droplet', label: 'Fertilizantes' },
    { icon: 'bi-chat', label: 'Mensajes' },
    { icon: 'bi-lightbulb', label: 'Recomendaciones' },
    { icon: 'bi-people', label: 'Usuarios' },
  ];

  return (
    <aside id="sidebar" className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <img src={logo} alt="AgroAmigo Logo" className="sidebar-logo" />
      </div>

      <ul className="nav flex-column sidebar-menu">
        {menuItems.map((item, index) => (
          <li key={index} className={`nav-item ${index === 1 || index === 3 ? 'divider' : ''}`}>
            <a
              href="#"
              className={`nav-link ${item.active ? 'active' : ''}`}
              data-tooltip={item.label} // tooltip para colapsado
            >
              <i className={`bi ${item.icon}`}></i>
              <span>{item.label}</span>
            </a>
          </li>
        ))}
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
