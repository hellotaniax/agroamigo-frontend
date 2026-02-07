export default function SidebarToggle({ collapsed, onToggle }) {
  return (
    <button className="btn btn-light sidebar-toggle" onClick={onToggle}>
      <i className={`bi ${collapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`} />
    </button>
  );
}
