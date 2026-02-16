/**
 * Mapper: API → Frontend
 */
export const mapFertilizanteFromApi = (item) => ({
  idfer: item.idfer,
  nombrefer: item.nombrefer,
  idtfer: item.idtfer,
  tipoNombre: item.tipoNombre,
  descripcionfer: item.descripcionfer,
  idest: item.idest,
  estadoNombre: item.estadoNombre,
});

/**
 * Mapper: lista API → Frontend
 */
export const mapFertilizantesFromApi = (data = []) =>
  data.map(mapFertilizanteFromApi);

/**
 * Mapper: Frontend → API
 * Se usa al crear o actualizar
 */
export const mapFertilizanteToApi = (formData) => ({
  nombrefer: formData.nombrefer,
  idtfer: Number(formData.idtfer),
  descripcionfer: formData.descripcionfer || '',
  idest: Number(formData.idest),
});