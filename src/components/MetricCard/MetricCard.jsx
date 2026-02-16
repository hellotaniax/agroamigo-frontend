import './MetricCard.css';

export default function MetricCard({ title, value, icon: Icon, color, loading }) {
  return (
    <div className={`metric-card ${color ? `metric-card-${color}` : ''}`}>
      {Icon && <div className="metric-icon"><Icon size={28} /></div>}

      <div className="metric-content">
        <h6>{title}</h6>
        <h3>{loading ? '...' : value}</h3>
      </div>
    </div>
  );
}