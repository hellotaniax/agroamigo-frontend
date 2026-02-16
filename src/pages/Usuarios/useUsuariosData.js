import { useState, useEffect, useMemo, useCallback } from 'react';
import usuariosService from '../../services/usuarios.service';
import catalogosService from '../../services/catalogos.service';
import { toast } from 'react-hot-toast'; 

export default function useUsuariosData(filters = {}) {
  const [usuariosRaw, setUsuariosRaw] = useState([]);
  const [estados, setEstados] = useState([]);
  const [roles, setRoles] = useState([]); 
  const [loading, setLoading] = useState(true);

  const { estado = '', search = '', rol = '' } = filters;

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
      (!rol || u.rolNombre === rol) && 
      (!search || 
        u.nombreusu.toLowerCase().includes(search.toLowerCase()) ||
        u.emailusu.toLowerCase().includes(search.toLowerCase()))
    );
  }, [usuariosRaw, estado, search, rol]); 

  useEffect(() => { loadData(); }, [loadData]);

  // Función para Agregar con Notificación
  const addUsuario = async (data) => {
    return toast.promise(
      (async () => {
        await usuariosService.create(data);
        await loadData(); // Recarga la tabla automáticamente
      })(),
      {
        loading: 'Guardando nuevo usuario...',
        success: '¡Usuario creado exitosamente!',
        error: 'Error: No se pudo crear el usuario.',
      }
    );
  };

  // Función para Actualizar con Notificación
  const updateUsuario = async (id, data) => {
    return toast.promise(
      (async () => {
        await usuariosService.update(id, data);
        await loadData(); // Recarga la tabla automáticamente
      })(),
      {
        loading: 'Actualizando datos...',
        success: '¡Cambios guardados correctamente!',
        error: 'Error: No se pudieron guardar los cambios.',
      }
    );
  };

  return { 
    usuarios, 
    estados, 
    roles, 
    loading, 
    reload: loadData,
    addUsuario,   
    updateUsuario  
  };
}