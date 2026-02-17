import { permissionsMap } from '../data/permissions';
import { getUser } from './sessionManager';

const normalize = (s) =>
  String(s || '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]/gi, '')
    .trim()
    .toLowerCase();

/**
 * Comprueba si un usuario (o el usuario en sesión) tiene permiso
 * para una acción concreta sobre un recurso.
 *
 * @param {string} recurso - Ej: 'usuarios', 'cultivos', 'fertilizantes'
 * @param {string} accion - 'read' | 'create' | 'update' | 'delete'
 * @param {object} [user] - objeto usuario (si no se pasa, usa sesión)
 * @returns {boolean}
 */
export function hasPermission(recurso, accion, user) {
  const u = user || getUser();
  if (!u || !u.rol) return false;

  const map = permissionsMap[recurso];
  if (!map) return false; // recurso desconocido -> denegar

  const allowed = map[accion];
  if (!Array.isArray(allowed) || allowed.length === 0) return false;

  const userRole = normalize(u.rol);

  return allowed.some((r) => {
    const allowedRole = normalize(r);
    if (allowedRole === userRole) return true;
    if (allowedRole.includes(userRole) || userRole.includes(allowedRole)) return true;
    return false;
  });
}

export default hasPermission;
