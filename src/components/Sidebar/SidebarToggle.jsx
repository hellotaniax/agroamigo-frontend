export default function SidebarToggle({ collapsed, onToggle }) {
  return (
    <button
      className="sidebar-toggle"
      onClick={onToggle}
      title={collapsed ? 'Expandir sidebar' : 'Contraer sidebar'}
    >
      <i className={`bi ${collapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`} />
    </button>
  );
}
