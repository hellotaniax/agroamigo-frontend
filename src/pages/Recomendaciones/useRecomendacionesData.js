import { useState, useEffect, useCallback } from 'react';

export default function useRecomendacionesData(options = {}) {
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { estado = '', search = '', priority = '' } = options;

  const filterData = useCallback(
    (data) => data.filter(r =>
      (!estado || r.estadoNombre === estado) &&
      (!priority || r.prioridadNombre === priority) &&
      (!search || r.titulorec.toLowerCase().includes(search.toLowerCase()) ||
       r.descripcionrec.toLowerCase().includes(search.toLowerCase()))
    ),
    [estado, search, priority]
  );

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = [
          { idrec: 'REC-01', titulorec: 'Riego matutino', descripcionrec: 'Regar temprano en la mañana para mejor absorción.', idest: 1, estadoNombre: 'Activo', idpri: 2, prioridadNombre: 'Media' },
          { idrec: 'REC-02', titulorec: 'Fertilización NPK', descripcionrec: 'Aplicar fertilizante NPK cada 30 días.', idest: 1, estadoNombre: 'Activo', idpri: 1, prioridadNombre: 'Alta' },
          { idrec: 'REC-03', titulorec: 'Inspección de plagas', descripcionrec: 'Inspeccionar hojas semanalmente por signos de plagas.', idest: 2, estadoNombre: 'Borrador', idpri: 3, prioridadNombre: 'Baja' },
        ];

        if (mounted) {
          setRecomendaciones(filterData(data));
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

  const prioridadesMap = {
    '1': 'Alta',
    '2': 'Media',
    '3': 'Baja',
  };

  const addRecomendacion = (data) => {
    const nextIdNumber = recomendaciones.length + 1;
    const newId = `REC-${String(nextIdNumber).padStart(2, '0')}`;
    const newRec = {
      idrec: newId,
      titulorec: data.titulorec || '',
      descripcionrec: data.descripcionrec || '',
      idest: data.idest || '',
      estadoNombre: estadosMap[String(data.idest)] || data.estadoNombre || '',
      idpri: data.idpri || '',
      prioridadNombre: prioridadesMap[String(data.idpri)] || data.prioridadNombre || '',
    };

    setRecomendaciones(prev => [newRec, ...prev]);
  };

  return { recomendaciones, loading, error, addRecomendacion };
}
