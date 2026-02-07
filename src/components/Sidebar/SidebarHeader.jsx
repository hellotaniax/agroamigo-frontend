import logo from '../../assets/img/logoagroamigo.png';

export default function SidebarHeader() {
  return (
    <div className="sidebar-header">
      <img src={logo} alt="AgroAmigo Logo" className="sidebar-logo" />
    </div>
  );
}
