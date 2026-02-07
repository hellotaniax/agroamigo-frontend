import './Sidebar.css';
import { useState } from 'react';

import SidebarHeader from './SidebarHeader';
import SidebarMenu from './SidebarMenu';
import SidebarToggle from './SidebarToggle';
import useSidebarTooltip from '../../hooks/useSidebarTooltip';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  useSidebarTooltip(collapsed);

  return (
    <aside id="sidebar" className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <SidebarHeader />
      <SidebarMenu />
      <SidebarToggle
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />
    </aside>
  );
}
