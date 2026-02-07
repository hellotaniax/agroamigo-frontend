import { useState, useEffect } from 'react';

// Hook para obtener y filtrar datos de cultivos
export default function useCultivosData() {
  const [cultivos, setCultivos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Simulación de fetch
      const data = [
        {
          idcul: 'CUL-01',
          nombrecul: 'Tomate',
          tipoNombre: 'Hortaliza',
          idest: 1,
          estadoNombre: 'Activo',
          creacioncul: '2026-02-05T12:00:00',
        },
        {
          idcul: 'CUL-02',
          nombrecul: 'Lechuga',
          tipoNombre: 'Hortaliza',
          idest: 2,
          estadoNombre: 'Inactivo',
          creacioncul: '2026-02-01T12:00:00',
        },
      ];
      setCultivos(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return { cultivos, loading };
}
