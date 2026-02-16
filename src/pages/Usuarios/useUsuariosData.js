import { useState, useEffect, useMemo, useCallback } from 'react';
import usuariosService from '../../services/usuarios.service';
import catalogosService from '../../services/catalogos.service';

export default function useUsuariosData(filters = {}) {
  const [usuariosRaw, setUsuariosRaw] = useState([]);
  const [estados, setEstados] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const { estado = '', search = '' } = filters;

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [uData, estData, rolData] = await Promise.all([
        usuariosService.getAll(),
        catalogosService.getEstados(),
        catalogosService.getRoles()
      ]);

      setEstados(estData);
      setRoles(rolData);

      const enriched = uData.map(u => ({
        ...u,
        estadoNombre: estData.find(e => e.idest === u.idest)?.nombreest || '—',
        rolNombre: rolData.find(r => r.idrol === u.idrol)?.nombrerol || '—',
      }));

      setUsuariosRaw(enriched);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const usuarios = useMemo(() => {
    return usuariosRaw.filter(u =>
      (!estado || u.estadoNombre === estado) &&
      (!search || 
        u.nombreusu.toLowerCase().includes(search.toLowerCase()) ||
        u.emailusu.toLowerCase().includes(search.toLowerCase()))
    );
  }, [usuariosRaw, estado, search]);

  useEffect(() => { loadData(); }, [loadData]);

  return { 
    usuarios, estados, roles, loading, reload: loadData,
    addUsuario: async (data) => { await usuariosService.create(data); await loadData(); },
    updateUsuario: async (id, data) => { await usuariosService.update(id, data); await loadData(); }
  };
}