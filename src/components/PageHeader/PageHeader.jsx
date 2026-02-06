export default function PageHeader({ title, toggleMobileSidebar }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h4 className="fw-semibold">{title}</h4>
      <button
        className="btn btn-outline-success d-md-none"
        onClick={toggleMobileSidebar}
      >
        <i className="bi bi-list" />
      </button>
    </div>
  );
}
