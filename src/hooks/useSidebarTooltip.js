import { useEffect } from 'react';

export default function useSidebarTooltip(collapsed) {
  useEffect(() => {
    document.querySelectorAll('.custom-sidebar-tooltip').forEach(t => t.remove());

    if (!collapsed) return;

    const links = document.querySelectorAll('.sidebar-menu .nav-link');
    let tooltip = null;
    let showTimeout = null;

    const show = (e) => {
      clearTimeout(showTimeout);
      const text = e.currentTarget.dataset.tooltip;
      const target = e.currentTarget; // ✅ guardar referencia antes del timeout
      if (!text) return;

      showTimeout = setTimeout(() => {
        document.querySelectorAll('.custom-sidebar-tooltip').forEach(t => t.remove());

        tooltip = document.createElement('div');
        tooltip.className = 'custom-sidebar-tooltip';
        tooltip.textContent = text;
        document.body.appendChild(tooltip);

        const rect = target.getBoundingClientRect(); // ✅ usar referencia guardada
        const tRect = tooltip.getBoundingClientRect();

        tooltip.style.top = `${rect.top + rect.height / 2 - tRect.height / 2}px`;
        tooltip.style.left = `${rect.right + 12}px`;

        requestAnimationFrame(() => {
          if (tooltip && document.body.contains(tooltip)) {
            tooltip.classList.add('show');
          }
        });
      }, 100);
    };

    const hide = () => {
      clearTimeout(showTimeout);
      document.querySelectorAll('.custom-sidebar-tooltip').forEach(t => t.remove());
      tooltip = null;
    };

    links.forEach(link => {
      link.addEventListener('mouseenter', show);
      link.addEventListener('mouseleave', hide);
      link.addEventListener('focus', show);
      link.addEventListener('blur', hide);
      link.addEventListener('click', hide);
    });

    return () => {
      clearTimeout(showTimeout);
      links.forEach(link => {
        link.removeEventListener('mouseenter', show);
        link.removeEventListener('mouseleave', hide);
        link.removeEventListener('focus', show);
        link.removeEventListener('blur', hide);
        link.removeEventListener('click', hide);
      });
      hide();
    };
  }, [collapsed]);
}