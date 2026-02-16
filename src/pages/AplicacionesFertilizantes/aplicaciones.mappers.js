export const mapAplicacionFromApi = (item) => ({
  idapl: item.idapl || item.id, // posible nombre del id
  idfer: item.idfer,
  idfap: item.idfap,
  ideta: item.ideta,
  dosisminapl: item.dosisminapl,
  dosismaxapl: item.dosismaxapl,
  recomendacionapl: item.recomendacionapl,
  fertilizanteNombre: item.fertilizanteNombre || '',
  formaNombre: item.formaNombre || '',
  etapaNombre: item.etapaNombre || '',
});

export const mapAplicacionesFromApi = (data = []) => data.map(mapAplicacionFromApi);

export const mapAplicacionToApi = (formData) => ({
  idfer: Number(formData.idfer),
  idfap: Number(formData.idfap),
  ideta: Number(formData.ideta),
  dosisminapl: Number(formData.dosisminapl),
  dosismaxapl: Number(formData.dosismaxapl),
  recomendacionapl: formData.recomendacionapl || '',
});
