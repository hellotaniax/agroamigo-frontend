import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import authService from '../../services/auth.service';
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
    remember: false,
  });

  // ===============================
  // Validaciones
  // ===============================
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (name === 'email') {
      setIsValidating((prev) => ({
        ...prev,
        email: value.length > 0 ? !validateEmail(value) : false,
      }));
    }

    if (name === 'password') {
      setIsValidating((prev) => ({
        ...prev,
        password: value.length > 0 ? value.length < 6 : false,
      }));
    }

    if (error) setError('');
  };

  // ===============================
  // Submit real con API
  // ===============================
  const handleSubmit = async (e) => {
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

    try {
      await authService.login(formData.email, formData.password);

      // Si no quiere recordar sesión, limpiar al cerrar navegador
      if (!formData.remember) {
        window.addEventListener('beforeunload', () => {
          authService.logout();
        });
      }

      navigate('/dashboard');
    } catch (err) {
      const message =
        err.response?.data?.message ||
        'Credenciales incorrectas o error del servidor';

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const isEmailValid = validateEmail(formData.email);
  const isPasswordValid = formData.password.length >= 6;
  const isFormValid =
    formData.email && formData.password && isEmailValid && isPasswordValid;

  // ===============================
  // UI
  // ===============================
  return (
    <div className="login-page vh-100 d-flex justify-content-center align-items-center">
      <div className="login-container">
        <div className="login-wrapper">
          {/* Header */}
          <div className="login-header text-center mb-5">
            <img src={logo} alt="Logo AgroAmigo" className="login-logo mb-3" />
            <h1 className="login-title">AgroAmigo</h1>
            <p className="login-subtitle">Bienvenido de vuelta</p>
          </div>

          {/* Error */}
          {error && (
            <div className="alert alert-danger alert-dismissible fade show mb-4">
              <i className="bi bi-exclamation-circle me-2"></i>
              {error}
              <button
                type="button"
                className="btn-close"
                onClick={() => setError('')}
              ></button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="form-group mb-3">
              <label className="form-label">Correo electrónico</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  className={`form-control form-control-lg ${
                    isValidating.email ? 'is-invalid' : ''
                  } ${formData.email && !isValidating.email ? 'is-valid' : ''}`}
                  name="email"
                  placeholder="tu@correo.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group mb-2">
              <label className="form-label">Contraseña</label>
              <div className="input-group input-group-lg">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`form-control ${
                    isValidating.password ? 'is-invalid' : ''
                  } ${formData.password && !isValidating.password ? 'is-valid' : ''}`}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} />
                </button>
              </div>
            </div>

            {/* Remember */}
            <div className="d-flex justify-content-between align-items-center mb-4 mt-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleInputChange}
                />
                <label className="form-check-label">Guardar sesión</label>
              </div>

              <Link to="/forgot-password" className="text-decoration-none">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-success btn-lg w-100 fw-bold"
              disabled={isLoading || !isFormValid}
            >
              {isLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Ingresando...
                </>
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
