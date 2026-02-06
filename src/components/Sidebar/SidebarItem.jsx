export default function SidebarItem({ icon, label, active }) {
  return (
    <li className="nav-item">
      <a
        href="#"
        className={`nav-link ${active ? "active" : ""}`}
        data-bs-toggle="tooltip"
        data-bs-placement="right"
        title={label}
      >
        <i className={`bi ${icon}`} />
        <span>{label}</span>
      </a>
    </li>
  );
}
