import { useState, useEffect, useCallback } from 'react';

export default function useCultivosData(options = {}) {
  const [cultivos, setCultivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { estado = '', nombre = '' } = options;

  const filterData = useCallback(
    (data) => data.filter(c =>
      (!estado || c.estadoNombre === estado) &&
      (!nombre || c.nombrecul.toLowerCase().includes(nombre.toLowerCase()))
    ),
    [estado, nombre]
  );

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = [
          { idcul: 'CUL-01', nombrecul: 'Tomate', tipoNombre: 'Hortaliza', idest: 1, estadoNombre: 'Activo', creacioncul: '2026-02-05T12:00:00' },
          { idcul: 'CUL-02', nombrecul: 'Lechuga', tipoNombre: 'Hortaliza', idest: 2, estadoNombre: 'Inactivo', creacioncul: '2026-02-01T12:00:00' },
        ];
        if (mounted) {
          setCultivos(filterData(data));
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

  return { cultivos, loading, error };
}
