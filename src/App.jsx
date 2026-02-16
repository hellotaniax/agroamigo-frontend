import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import DashboardPage from './pages/Dashboard';
import CultivosPage from './pages/Cultivos';
import FertilizantesPage from './pages/Fertilizantes';
import AplicacionesFertilizantesPage from './pages/AplicacionesFertilizantes';
import MensajesPage from './pages/Mensajes';
import RecomendacionesPage from './pages/Recomendaciones';
import UsuariosPage from './pages/Usuarios';
import ProtectedRoute from './routes/ProtectedRoute';
import authService from './services/auth.service';
import './styles/index.css';

function App() {
  return (
    <Router>
      <Routes>

        {/* ===================== */}
        {/* LOGIN CON REDIRECCIÓN SI YA ESTÁ AUTENTICADO */}
        {/* ===================== */}
        <Route
          path="/login"
          element={
            authService.isAuthenticated()
              ? <Navigate to="/dashboard" replace />
              : <LoginPage />
          }
        />

        {/* ===================== */}
        {/* RUTAS PROTEGIDAS */}
        {/* ===================== */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/cultivos" element={<CultivosPage />} />
          <Route path="/fertilizantes" element={<FertilizantesPage />} />
          <Route path="/aplicaciones-fertilizantes" element={<AplicacionesFertilizantesPage />} />
          <Route path="/mensajes" element={<MensajesPage />} />
          <Route path="/recomendaciones" element={<RecomendacionesPage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
        </Route>

        {/* Redirección global */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />

      </Routes>
    </Router>
  );
}

export default App;
