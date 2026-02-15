import { useEffect, useState } from 'react';
import catalogosService from '../services/catalogos.service';

export default function useCatalogos() {
  const [tiposCultivo, setTiposCultivo] = useState([]);
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    const loadCatalogos = async () => {
      try {
        const [tipos, estados] = await Promise.all([
          catalogosService.getTiposCultivo(),
          catalogosService.getEstados(),
        ]);

        // ✅ TRANSFORMAR al formato {value, label} que espera el select
        setTiposCultivo(
          tipos.map(t => ({
            value: t.idtcul,
            label: t.nombretcul,
          }))
        );

        setEstados(
          estados.map(e => ({
            value: e.idest,
            label: e.nombreest,
          }))
        );
      } catch (error) {
        console.error('Error cargando catálogos:', error);
      }
    };

    loadCatalogos();
  }, []);

  return { tiposCultivo, estados };
}