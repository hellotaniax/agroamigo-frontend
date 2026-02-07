import { useState, useEffect, useCallback } from 'react';

export default function useFertilizantesData(options = {}) {
  const [fertilizantes, setFertilizantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { estado = '', nombre = '', tipo = '' } = options;

  const filterData = useCallback(
    (data) => data.filter(f =>
      (!estado || f.estadoNombre === estado) &&
      (!nombre || f.nombrefer.toLowerCase().includes(nombre.toLowerCase())) &&
      (!tipo || f.tipoNombre === tipo)
    ),
    [estado, nombre, tipo]
  );

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = [
          { idfer: 'FER-01', nombrefer: 'Urea', tipoNombre: 'Nitrogenado', descripcionfer: 'Fertilizante nitrogenado de alta concentración', idest: 1, estadoNombre: 'Activo'},
          { idfer: 'FER-02', nombrefer: 'Superfosfato triple', tipoNombre: 'Fosfatado', descripcionfer: 'Fosfato soluble para mayor disponibilidad', idest: 1, estadoNombre: 'Activo'},
          { idfer: 'FER-03', nombrefer: 'Cloruro de potasio', tipoNombre: 'Potásico', descripcionfer: 'Potasio de alta pureza', idest: 1, estadoNombre: 'Activo'},
        ];
        if (mounted) {
          setFertilizantes(filterData(data));
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

  // Mapeos para tipos y estados
  const tiposMap = {
    '1': 'Nitrogenado',
    '2': 'Fosfatado',
    '3': 'Potásico',
    '4': 'Complejo NPK',
    '5': 'Micronutrientes',
    '99': 'Otro',
  };

  const estadosMap = {
    '1': 'Activo',
    '2': 'Archivado',
    '3': 'Borrador',
  };

  // Función para agregar un fertilizante
  const addFertilizante = (data) => {
    const nextIdNumber = fertilizantes.length + 1;
    const newId = `FER-${String(nextIdNumber).padStart(2, '0')}`;
    const newFertilizante = {
      idfer: newId,
      nombrefer: data.nombrefer || '',
      idtfer: data.idtfer || '',
      tipoNombre: tiposMap[String(data.idtfer)] || data.tipoNombre || '',
      descripcionfer: data.descripcionfer || '',
      idest: data.idest || '',
      estadoNombre: estadosMap[String(data.idest)] || data.estadoNombre || '',
    };

    setFertilizantes(prev => [newFertilizante, ...prev]);
  };

  return { fertilizantes, loading, error, addFertilizante };
}
