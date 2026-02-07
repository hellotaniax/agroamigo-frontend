import { format } from 'date-fns';

/**
 * Formatea una fecha en formato dd/MM/yyyy
 * @param {string|Date} date
 * @returns {string}
 */
export function formatDate(date) {
  if (!date) return '-';
  try {
    return format(new Date(date), 'dd/MM/yyyy');
  } catch (e) {
    console.error('Error formateando fecha:', date);
    return date;
  }
}
