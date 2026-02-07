import { Link } from 'react-router-dom';

export default function SidebarItem({ icon, label, active, divider, to }) {
  return (
    <li className={`nav-item ${divider ? 'divider' : ''}`}>
      <Link
        to={to || '#'}
        className={`nav-link ${active ? 'active' : ''}`}
        data-tooltip={label}
      >
        <i className={`bi ${icon}`}></i>
        <span>{label}</span>
      </Link>
    </li>
  );
}
