import Sidebar from '../../components/Sidebar';

export default function AdminLayout({ children }) {
  return (
    <div className="d-flex dashboard-container">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
