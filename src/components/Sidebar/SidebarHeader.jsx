import { Link } from 'react-router-dom'; 
import logo from '../../assets/img/logoagroamigo.png';

export default function SidebarHeader() {
  return (
    <div className="sidebar-header">
      <Link to="/dashboard" style={{ display: 'block' }}>
        <img 
          src={logo} 
          alt="AgroAmigo Logo" 
          className="sidebar-logo" 
          style={{ cursor: 'pointer' }} 
        />
      </Link>
    </div>
  );
}