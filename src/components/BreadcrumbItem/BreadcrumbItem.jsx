
import './BreadcrumbItem.css';

export default function BreadcrumbItem({ label, link, isLast }) {
  return (
    <span className="breadcrumb-item">
      {link && !isLast ? (
        <a href={link}>{label}</a>
      ) : (
        <span>{label}</span>
      )}
      {!isLast && <span className="breadcrumb-separator">/</span>}
    </span>
  );
}
