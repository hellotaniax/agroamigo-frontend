import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logoagroamigo.png';
import './Login.css';
import useLogin from './useLogin';
import LoginForm from '../../components/LoginForm';

export default function LoginPage() {
  const {
    formData,
    showPassword,
    isLoading,
    error,
    isValidating,
    handleInputChange,
    handleSubmit,
    toggleShowPassword,
    clearError,
    isFormValid,
  } = useLogin();

  return (
    <div className="login-page vh-100 d-flex justify-content-center align-items-center">
      <div className="login-container">
        <div className="login-wrapper">
          <div className="login-header text-center mb-5">
            <img src={logo} alt="Logo AgroAmigo" className="login-logo mb-3" />
            <h1 className="login-title">AgroAmigo</h1>
            <p className="login-subtitle">Bienvenido de vuelta</p>
          </div>

          <LoginForm
            formData={formData}
            isValidating={isValidating}
            isLoading={isLoading}
            showPassword={showPassword}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            toggleShowPassword={toggleShowPassword}
            error={error}
            clearError={clearError}
            isFormValid={isFormValid}
          />

          {/* Enlace de recuperación de contraseña */}
          <div className="text-center mt-3">
            <Link to="/forgot-password" className="text-muted forgot-password-link">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}