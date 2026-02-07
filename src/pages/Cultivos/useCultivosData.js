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
          { idcul: 'CUL-02', nombrecul: 'Lechuga', tipoNombre: 'Hortaliza', idest: 2, estadoNombre: 'Archivado', creacioncul: '2026-02-01T12:00:00' },
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

  // Mappings para tipos y estados (simulados)
  const tiposMap = {
    '1': 'Hortaliza',
    '2': 'Fruta',
    '3': 'Grano',
    '99': 'Otro',
  };

  const estadosMap = {
    '1': 'Activo',  
    '3': 'Borrador',
    '2': 'Archivado',
  };

  // Función para agregar un cultivo (simula insertar en backend)
  const addCultivo = (data) => {
    const nextIdNumber = cultivos.length + 1;
    const newId = `CUL-${String(nextIdNumber).padStart(2, '0')}`;
    const newCultivo = {
      idcul: newId,
      nombrecul: data.nombrecul || '',
      idtcul: data.idtcul || '',
      tipoNombre: tiposMap[String(data.idtcul)] || data.tipoNombre || '',
      idest: data.idest || '',
      estadoNombre: estadosMap[String(data.idest)] || data.estadoNombre || '',
      creacioncul: new Date().toISOString(),
    };

    setCultivos(prev => [newCultivo, ...prev]);
  };

  return { cultivos, loading, error, addCultivo };
}
