import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/auth.service';

/**
 * Componente para proteger rutas privadas.
 * Si el usuario no está autenticado → redirige a /login
 * Si está autenticado → renderiza la ruta hija
 */
export default function ProtectedRoute() {
  const isAuthenticated = authService.isAuthenticated();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
