import { NavLink } from 'react-router-dom'; // 1. Cambiamos Link por NavLink

export default function SidebarItem({ icon, label, divider, to }) {
  return (
    <li className={`nav-item ${divider ? 'divider' : ''}`}>
      {}
      <NavLink
        to={to || '#'}

        className={({ isActive }) => 
          `nav-link ${isActive ? 'active' : ''}`
        }
        data-tooltip={label}
    
        end={to === '/' || to === '/dashboard'} 
      >
        <i className={`bi ${icon}`}></i>
        <span>{label}</span>
      </NavLink>
    </li>
  );
}
