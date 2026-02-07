import { BiPlus } from 'react-icons/bi';

export default function AddButton({ onClick, children }) {
  return (
    <button type="button" className="btn btn-primary d-flex align-items-center" onClick={onClick}>
      <BiPlus className="me-1" /> {children || 'Agregar'}
    </button>
  );
}
