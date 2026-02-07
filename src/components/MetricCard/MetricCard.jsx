import './MetricCard.css';

export default function MetricCard({ title, value, icon }) {
  return (
    <div className="metric-card">
      {icon && <div className="metric-icon">{icon}</div>}

      <div className="metric-content">
        <h6>{title}</h6>
        <h3>{value}</h3>
      </div>
    </div>
  );
}

