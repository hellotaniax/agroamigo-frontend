import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './LoginForm.css';

export default function LoginForm({
  formData,
  isValidating,
  isLoading,
  showPassword,
  handleInputChange,
  handleSubmit,
  toggleShowPassword,
  error,
  clearError,
  isFormValid,
}) {
  return (
    <>
      {error && (
        <div className="alert alert-danger alert-dismissible fade show mb-4">
          <i className="bi bi-exclamation-circle me-2"></i>
          {error}
          <button type="button" className="btn-close" onClick={clearError}></button>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group mb-3">
          <label className="form-label">Correo electrónico</label>
          <div className="input-wrapper">
            <input
              type="email"
              className={`form-control form-control-lg ${isValidating.email ? 'is-invalid' : ''} ${formData.email && !isValidating.email ? 'is-valid' : ''}`}
              name="email"
              placeholder="tu@correo.com"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
          </div>
        </div>

        <div className="form-group mb-2">
          <label className="form-label">Contraseña</label>
          <div className="input-group input-group-lg">
            <input
              type={showPassword ? 'text' : 'password'}
              className={`form-control ${isValidating.password ? 'is-invalid' : ''} ${formData.password && !isValidating.password ? 'is-valid' : ''}`}
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
            <button type="button" className="btn btn-outline-secondary" onClick={toggleShowPassword}>
              <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} />
            </button>
          </div>
        </div>

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

        <button type="submit" className="btn btn-success btn-lg w-100 fw-bold" disabled={isLoading || !isFormValid}>
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
    </>
  );
}
