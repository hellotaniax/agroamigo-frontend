export default function SidebarItem({ icon, label, active, divider }) {
  return (
    <li className={`nav-item ${divider ? 'divider' : ''}`}>
      <a
        href="#"
        className={`nav-link ${active ? 'active' : ''}`}
        data-tooltip={label}
      >
        <i className={`bi ${icon}`}></i>
        <span>{label}</span>
      </a>
    </li>
  );
}
