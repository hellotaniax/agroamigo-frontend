/**
 * Mapper: API → Frontend
 */
export const mapCultivoFromApi = (item) => ({
  idcul: item.idcul,
  nombrecul: item.nombrecul,
  idtcul: item.idtcul,
  tipoNombre: item.tipoNombre,
  idest: item.idest,
  estadoNombre: item.estadoNombre,
  creacioncul: item.creacioncul,
});

/**
 * Mapper: lista API → Frontend
 */
export const mapCultivosFromApi = (data = []) =>
  data.map(mapCultivoFromApi);

/**
 * ✅ Mapper: Frontend → API
 * Se usa al crear o actualizar
 */
export const mapCultivoToApi = (formData) => ({
  nombrecul: formData.nombrecul,
  idtcul: Number(formData.idtcul),
  idest: Number(formData.idest),
});
