import SidebarItem from './SidebarItem';
import { sidebarMenu } from '../../data/sidebarMenu';

export default function SidebarMenu() {
  return (
    <ul className="nav flex-column sidebar-menu">
      {sidebarMenu.map((item, index) => (
        <SidebarItem
          key={index}
          {...item}
          /* Ajuste: mover divisores para agrupar 'Aplicaciones' con Cultivos y Fertilizantes */
          divider={index === 0 || index === 3 || index === 5}
        />
      ))}
    </ul>
  );
}
