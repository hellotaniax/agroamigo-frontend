import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Spinner } from 'react-bootstrap';
import './LoginForm.css';

function CuentaRegresiva({ bloqueadoHasta, onExpira }) {
  const calcularSegundos = useCallback(
    () => Math.max(0, Math.ceil((new Date(bloqueadoHasta) - new Date()) / 1000)),
    [bloqueadoHasta]
  );

  const [segundosRestantes, setSegundosRestantes] = useState(calcularSegundos);
  const onExpiraRef = useRef(onExpira);

  useEffect(() => {
    onExpiraRef.current = onExpira;
  }, [onExpira]);

  useEffect(() => {
    if (segundosRestantes <= 0) {
      onExpiraRef.current();
      return;
    }

    const intervalo = setInterval(() => {
      const restantes = calcularSegundos();
      setSegundosRestantes(restantes);
      if (restantes <= 0) {
        clearInterval(intervalo);
        onExpiraRef.current();
      }
    }, 1000);

    return () => clearInterval(intervalo);
  }, [calcularSegundos, segundosRestantes]);

  const minutos = Math.floor(segundosRestantes / 60).toString().padStart(2, '0');
  const segundos = (segundosRestantes % 60).toString().padStart(2, '0');

  return <span className="fw-bold fs-4">{minutos}:{segundos}</span>;
}

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
  bloqueado,
  bloqueadoHasta,
  handleDesbloqueo,
}) {
  return (
    <>
      {/* Alerta de bloqueo con countdown */}
      {bloqueado ? (
        <div className="alert alert-warning mb-4">
          <div className="d-flex align-items-center mb-1">
            <i className="bi bi-lock-fill me-2 fs-5"></i>
            <strong>Cuenta bloqueada temporalmente</strong>
          </div>
          <p className="mb-1 small">
            Demasiados intentos fallidos. Podrás intentarlo de nuevo en:
          </p>
          <div className="text-center my-2">
            {bloqueadoHasta ? (
              <CuentaRegresiva
                bloqueadoHasta={bloqueadoHasta}
                onExpira={handleDesbloqueo}
              />
            ) : (
              <span className="fw-bold">unos minutos</span>
            )}
          </div>
          <p className="mb-0 small text-muted">
            Si no fuiste tú, considera cambiar tu contraseña al ingresar.
          </p>
        </div>
      ) : (
        /* Alerta de error normal */
        error && (
          <div className="alert alert-danger alert-dismissible fade show mb-4">
            <i className="bi bi-exclamation-circle me-2"></i>
            {error}
            <button type="button" className="btn-close" onClick={clearError}></button>
          </div>
        )
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
              disabled={isLoading || bloqueado}
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
              disabled={isLoading || bloqueado}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={toggleShowPassword}
              disabled={bloqueado}
            >
              <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} />
            </button>
          </div>
        </div>

        <div className="d-flex align-items-center mb-4 mt-3">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="remember"
              name="remember"
              checked={formData.remember}
              onChange={handleInputChange}
              disabled={bloqueado}
            />
            <label className="form-check-label" htmlFor="remember" style={{ userSelect: 'none' }}>
              Guardar sesión
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-success btn-lg w-100 fw-bold login-btn"
          disabled={isLoading || !isFormValid || bloqueado}
        >
          {isLoading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Ingresando...
            </>
          ) : bloqueado ? (
            <>
              <i className="bi bi-lock-fill me-2"></i>
              Cuenta bloqueada
            </>
          ) : (
            'Iniciar sesión'
          )}
        </button>
      </form>
    </>
  );
}