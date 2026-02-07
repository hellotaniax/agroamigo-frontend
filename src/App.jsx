import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CultivosPage from './pages/Cultivos';
import DashboardPage from './pages/Dashboard';
import LoginPage from './pages/Login/LoginPage';
import './styles/index.css';



function App() {
  const isLoggedIn = true; 


  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={isLoggedIn ? <DashboardPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/cultivos"
          element={isLoggedIn ? <CultivosPage /> : <Navigate to="/login" />}
        />

        {/* Ruta comodín */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>

    </Router>
  );
}

export default App;
