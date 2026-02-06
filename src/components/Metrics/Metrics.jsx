/*import './MetricCard.css';

export default function MetricCard({ title, value, icon }) {
  return (
    <div className="metric-card p-3 shadow-sm bg-white rounded d-flex align-items-center">
      {icon && <div className="metric-icon me-3">{icon}</div>}
      <div>
        <h6 className="metric-title">{title}</h6>
        <h3 className="metric-value">{value}</h3>
      </div>
    </div>
  );
}
*/ // Código simplificado sin clases adicionales, usando solo las de Bootstrap y la clase base "metric-card" para estilos personalizados.

import './MetricCard.css';

export default function MetricCard({ title, value, icon }) {
  return (
    <div className="metric-card d-flex align-items-center">
      {icon && <div className="metric-icon me-3">{icon}</div>}
      <div>
        <h6>{title}</h6>
        <h3>{value}</h3>
      </div>
    </div>
  );
} //
