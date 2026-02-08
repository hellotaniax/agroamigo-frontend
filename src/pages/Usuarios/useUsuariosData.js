import { useState, useEffect, useCallback } from 'react';

export default function useUsuariosData(options = {}) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { estado = '', search = '' } = options;

  const filterData = useCallback(
    (data) => data.filter(u =>
      (!estado || u.estadoNombre === estado) &&
      (!search || u.nombreusu.toLowerCase().includes(search.toLowerCase()) ||
       u.apellidosusu.toLowerCase().includes(search.toLowerCase()) ||
       u.emailusu.toLowerCase().includes(search.toLowerCase()))
    ),
    [estado, search]
  );

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = [
          { idusu: 'USU-01', nombreusu: 'Ana', apellidosusu: 'Gómez', emailusu: 'ana@example.com', contraseniausu: 'secret', idest: 1, estadoNombre: 'Activo' },
          { idusu: 'USU-02', nombreusu: 'Carlos', apellidosusu: 'Perez', emailusu: 'carlos@example.com', contraseniausu: 'secret', idest: 1, estadoNombre: 'Activo' },
          { idusu: 'USU-03', nombreusu: 'María', apellidosusu: 'Lopez', emailusu: 'maria@example.com', contraseniausu: 'secret', idest: 2, estadoNombre: 'Borrador' },
        ];

        if (mounted) {
          setUsuarios(filterData(data));
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err);
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => { mounted = false; };
  }, [filterData]);

  const estadosMap = {
    '1': 'Activo',
    '2': 'Borrador',
    '3': 'Archivado',
  };

  const addUsuario = (data) => {
    const nextIdNumber = usuarios.length + 1;
    const newId = `USU-${String(nextIdNumber).padStart(2, '0')}`;
    const newUsu = {
      idusu: newId,
      nombreusu: data.nombreusu || '',
      apellidosusu: data.apellidosusu || '',
      emailusu: data.emailusu || '',
      contraseniausu: data.contraseniausu || '',
      idest: data.idest || '',
      estadoNombre: estadosMap[String(data.idest)] || data.estadoNombre || '',
    };

    setUsuarios(prev => [newUsu, ...prev]);
  };

  return { usuarios, loading, error, addUsuario };
}
