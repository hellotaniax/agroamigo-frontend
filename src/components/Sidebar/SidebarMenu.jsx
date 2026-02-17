import { useEffect, useState } from 'react';
import SidebarItem from './SidebarItem';
import { sidebarMenu } from '../../data/sidebarMenu';
import { getUser } from '../../utils/sessionManager';

export default function SidebarMenu() {
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    const handler = () => setUser(getUser());
    window.addEventListener('sessionChanged', handler);
    return () => window.removeEventListener('sessionChanged', handler);
  }, []);

  // Filtrar elementos del menú según roles definidos en cada item (si existen)
  const filteredMenu = sidebarMenu.filter((item) => {
    if (!item.roles || item.roles.length === 0) return true;
    if (!user || !user.rol) return false;

    const normalize = (s) =>
      String(s || '')
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .replace(/[^a-z0-9]/gi, '')
        .trim()
        .toLowerCase();

    const userRole = normalize(user.rol);

    return item.roles.some((r) => {
      const allowedRole = normalize(r);
      if (allowedRole === userRole) return true;
      if (allowedRole.includes(userRole) || userRole.includes(allowedRole)) return true;
      return false;
    });
  });

  const dividerPaths = ['/dashboard', '/aplicaciones-fertilizantes', '/recomendaciones'];

  return (
    <ul className="nav flex-column sidebar-menu">
      {filteredMenu.map((item, index) => (
        <SidebarItem
          key={index}
          {...item}
          divider={dividerPaths.includes(item.to)}
        />
      ))}
    </ul>
  );
}
