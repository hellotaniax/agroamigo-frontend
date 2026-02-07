import SidebarItem from './SidebarItem';
import { sidebarMenu } from '../../data/sidebarMenu';

export default function SidebarMenu() {
  return (
    <ul className="nav flex-column sidebar-menu">
      {sidebarMenu.map((item, index) => (
        <SidebarItem
          key={index}
          {...item}
          divider={index === 1 || index === 3}
        />
      ))}
    </ul>
  );
}
