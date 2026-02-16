import { Link } from 'react-router-dom';
import useRecuperarPassword from './useRecuperarPassword';
import StepEmailForm from './components/StepEmailForm';
import StepCodigoForm from './components/StepCodigoForm';
import StepPasswordForm from './components/StepPasswordForm';
import '../Login/Login.css';

export default function RecuperarPasswordPage() {
  const state = useRecuperarPassword();

  const steps = [
    'Correo',
    'Verificación',
    'Nueva contraseña'
  ];

  return (
    <div className="login-page vh-100 d-flex justify-content-center align-items-center">
      <div className="login-container">
        <div className="login-wrapper">

          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="login-title">Recuperar contraseña</h1>
          </div>

          {/* Step Indicator */}
          <div className="d-flex justify-content-between align-items-center mb-4 px-2">
            {steps.map((label, index) => {
              const stepNumber = index + 1;
              const active = state.paso === stepNumber;
              const completed = state.paso > stepNumber;

              return (
                <div key={label} className="text-center flex-fill">
                  <div
                    className={`rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center`}
                    style={{
                      width: 36,
                      height: 36,
                      fontSize: 14,
                      fontWeight: 600,
                      backgroundColor: completed
                        ? '#198754'
                        : active
                        ? '#0d6efd'
                        : '#dee2e6',
                      color: completed || active ? '#fff' : '#6c757d',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {stepNumber}
                  </div>
                  <small
                    style={{
                      color: active ? '#0d6efd' : '#6c757d',
                      fontWeight: active ? 600 : 400
                    }}
                  >
                    {label}
                  </small>
                </div>
              );
            })}
          </div>

          {/* Alertas */}
          {state.error && (
            <div className="alert alert-danger mb-3">
              {state.error}
            </div>
          )}

          {state.mensaje && (
            <div className="alert alert-success mb-3">
              {state.mensaje}
            </div>
          )}

          {/* Formulario */}
          <div className="login-form mt-3">
            {state.paso === 1 && <StepEmailForm {...state} />}
            {state.paso === 2 && <StepCodigoForm {...state} />}
            {state.paso === 3 && <StepPasswordForm {...state} />}
          </div>

          {/* Volver */}
          <div className="text-center mt-4">
            <Link to="/login" className="forgot-password-link">
              ← Volver al inicio de sesión
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
