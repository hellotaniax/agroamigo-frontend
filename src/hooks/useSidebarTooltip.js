
import { useEffect } from 'react';

// Crear un tooltip personalizado para los enlaces del sidebar cuando está colapsado
export default function useSidebarTooltip(collapsed) {
  useEffect(() => {
    if (!collapsed) return;

    const links = document.querySelectorAll('.sidebar-menu .nav-link');
    let tooltip = null;

    const show = (e) => {
      const text = e.currentTarget.dataset.tooltip;
      if (!text) return;

      tooltip = document.createElement('div');
      tooltip.className = 'custom-sidebar-tooltip';
      tooltip.textContent = text;
      document.body.appendChild(tooltip);

      const rect = e.currentTarget.getBoundingClientRect();
      const tRect = tooltip.getBoundingClientRect();

      tooltip.style.top = `${rect.top + rect.height / 2 - tRect.height / 2}px`;
      tooltip.style.left = `${rect.right + 12}px`;
      tooltip.style.opacity = '1';
    };

    const hide = () => {
      tooltip?.remove();
      tooltip = null;
    };

    links.forEach(link => {
      link.addEventListener('mouseenter', show);
      link.addEventListener('mouseleave', hide);
      link.addEventListener('focus', show);
      link.addEventListener('blur', hide);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('mouseenter', show);
        link.removeEventListener('mouseleave', hide);
        link.removeEventListener('focus', show);
        link.removeEventListener('blur', hide);
      });
      hide();
    };
  }, [collapsed]);
}
