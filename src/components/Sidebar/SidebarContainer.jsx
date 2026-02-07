import { useState } from 'react';
import useSidebarTooltip from '../../hooks/useSidebarTooltip';
import Sidebar from './Sidebar';

export default function SidebarContainer({ mobileOpen, onCloseMobile }) {
  const [collapsed, setCollapsed] = useState(false);

  useSidebarTooltip(collapsed);

  return (
    <Sidebar
      collapsed={collapsed}
      mobileOpen={mobileOpen}
      onToggleCollapse={() => setCollapsed(!collapsed)}
      onCloseMobile={onCloseMobile}
    />
  );
}
