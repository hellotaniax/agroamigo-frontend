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
        <div className="login-wrapper login-wrapper--wide recovery-card">

          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="login-title recovery-title">Recuperar contraseña</h1>
          </div>
          <div className="step-indicator">
            {steps.map((label, index) => {
              const stepNumber = index + 1;
              const active = state.paso === stepNumber;
              const completed = state.paso > stepNumber;

              return (
                <div 
                  key={label} 
                  className={`step-item ${active ? 'active' : ''} ${completed ? 'completed' : ''}`}
                >
                  <div className="step-circle">
                    {stepNumber}
                  </div>
                  <div className="step-label">
                    {label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Alertas de Error */}
          {state.error && (
            <div className="alert alert-danger mb-3 text-center">
              {state.error}
            </div>
          )}

          {state.mensaje && state.paso === 2 && (
            <div className="recovery-alert-info">
              {state.mensaje}
            </div>
          )}

          {/* Formulario */}
          <div className="login-form mt-3">
            {state.paso === 1 && <StepEmailForm {...state} />}
            {state.paso === 2 && <StepCodigoForm {...state} />}
            {state.paso === 3 && <StepPasswordForm {...state} />}
          </div>

          {/* Volver al login (Footer) */}
          <div className="mt-2">
            <Link to="/login" className="back-to-login-link">
              ← Volver al inicio de sesión
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}