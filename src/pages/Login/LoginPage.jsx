import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Se agregó Link
import { Spinner } from 'react-bootstrap';
import logo from '../../assets/img/logoagroamigo.png';
import './Login.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  // Validación en tiempo real
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    if (name === 'email') {
      setIsValidating(prev => ({
        ...prev,
        email: value.length > 0 ? !validateEmail(value) : false
      }));
    }
    
    if (name === 'password') {
      setIsValidating(prev => ({
        ...prev,
        password: value.length > 0 ? value.length < 6 : false
      }));
    }
    
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos requeridos');
      return;
    }
    
    if (!validateEmail(formData.email)) {
      setError('Por favor ingresa un correo electrónico válido');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    // Simulación de API
    setTimeout(() => {
      console.log('Login data:', formData);
      navigate('/dashboard');
      setIsLoading(false);
    }, 1200);
  };

  const isEmailValid = validateEmail(formData.email);
  const isPasswordValid = formData.password.length >= 6;
  const isFormValid = formData.email && formData.password && isEmailValid && isPasswordValid;

  return (
    <div className="login-page vh-100 d-flex justify-content-center align-items-center">
      <div className="login-container">
        <div className="login-wrapper">
                
          {/* Header */}
          <div className="login-header text-center mb-5">
            <img 
              src={logo} 
              alt="Logo AgroAmigo" 
              className="login-logo mb-3"
            />
            <h1 className="login-title">AgroAmigo</h1>
            <p className="login-subtitle">Bienvenido de vuelta</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="alert alert-danger alert-dismissible fade show mb-4" role="alert">
              <i className="bi bi-exclamation-circle me-2"></i>
              <span>{error}</span>
              <button type="button" className="btn-close" onClick={() => setError('')}></button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form" noValidate>
                    
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <div className="input-wrapper">
                <input 
                  type="email" 
                  className={`form-control form-control-lg ${isValidating.email ? 'is-invalid' : ''} ${formData.email && !isValidating.email ? 'is-valid' : ''}`}
                  id="email" 
                  name="email"
                  placeholder="tu@correo.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  autoComplete="email"
                  required
                />
                {formData.email && (
                  <span className="input-icon">
                    {isValidating.email ? (
                      <i className="bi bi-x-circle text-danger"></i>
                    ) : (
                      <i className="bi bi-check-circle text-success"></i>
                    )}
                  </span>
                )}
              </div>
              {isValidating.email && (
                <small className="form-text text-danger mt-1 d-block">
                  Por favor ingresa un correo válido
                </small>
              )}
            </div>

            <div className="form-group mb-2">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <div className="input-group input-group-lg password-group">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  className={`form-control ${isValidating.password ? 'is-invalid' : ''} ${formData.password && !isValidating.password ? 'is-valid' : ''}`}
                  id="password" 
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  autoComplete="current-password"
                  required
                />
                <button 
                  className="btn btn-outline-secondary toggle-password-btn" 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  aria-label="Mostrar u ocultar contraseña"
                  tabIndex="-1"
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>
              {isValidating.password && (
                <small className="form-text text-danger mt-1 d-block">
                  Mínimo 6 caracteres
                </small>
              )}
            </div>

            {/* Remember & Forgot Password - CORREGIDO */}
            <div className="d-flex justify-content-between align-items-center mb-4 mt-3">
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id="remember" 
                  name="remember"
                  checked={formData.remember}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                <label className="form-check-label" htmlFor="remember">
                  Guardar sesión
                </label>
              </div>
              {/* Cambiado de <a> a <Link> para evitar el Warning de ESLint */}
              <Link to="/forgot-password" size="sm" className="forgot-password-link text-decoration-none">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn btn-success btn-lg w-100 fw-bold login-btn"
              disabled={isLoading || !isFormValid}
            >
              {isLoading ? (
                <><Spinner animation="border" size="sm" className="me-2" />Ingresando...</>
              ) : (
                'Iniciar sesión'
              )}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}