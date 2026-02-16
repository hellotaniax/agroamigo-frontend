import { Link } from 'react-router-dom';
import logo from '../../assets/img/logoagroamigo.png';
import './ForgotPassword.css';
import useForgotPassword from './useForgotPassword';
import ForgotPasswordForm from './components/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  const {
    formData,
    isLoading,
    error,
    success,
    isValidating,
    handleInputChange,
    handleSubmit,
    clearError,
    isFormValid,
  } = useForgotPassword();

  return (
    <div className="forgot-password-page vh-100 d-flex justify-content-center align-items-center">
      <div className="forgot-password-container">
        <div className="forgot-password-wrapper">
          <div className="forgot-password-header text-center mb-5">
            <img src={logo} alt="Logo AgroAmigo" className="forgot-password-logo mb-3" />
            <h1 className="forgot-password-title">Recuperar Contraseña</h1>
            <p className="forgot-password-subtitle">
              Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña
            </p>
          </div>

          {success ? (
            <div className="success-message text-center">
              <div className="alert alert-success" role="alert">
                <h5>¡Correo enviado!</h5>
                <p>Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.</p>
              </div>
              <Link to="/login" className="btn btn-primary mt-3">
                Volver al inicio de sesión
              </Link>
            </div>
          ) : (
            <ForgotPasswordForm
              formData={formData}
              isValidating={isValidating}
              isLoading={isLoading}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              error={error}
              clearError={clearError}
              isFormValid={isFormValid}
            />
          )}

          <div className="text-center mt-4">
            <Link to="/login" className="text-muted">
              ← Volver al inicio de sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}