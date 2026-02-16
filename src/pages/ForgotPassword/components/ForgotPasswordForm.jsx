import { BiEnvelope } from 'react-icons/bi';

export default function ForgotPasswordForm({
  formData,
  isValidating,
  isLoading,
  handleInputChange,
  handleSubmit,
  error,
  clearError,
  isFormValid,
}) {
  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Mensaje de error */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={clearError}
            aria-label="Close"
          />
        </div>
      )}

      {/* Campo de email */}
      <div className="mb-4">
        <label htmlFor="email" className="form-label">
          Correo electrónico
        </label>
        <div className="input-group">
          <span className="input-group-text">
            <BiEnvelope />
          </span>
          <input
            type="email"
            className={`form-control ${isValidating && !formData.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="tu@email.com"
            required
            autoFocus
            disabled={isLoading}
          />
        </div>
        {isValidating && !formData.email && (
          <div className="invalid-feedback d-block">
            El correo electrónico es requerido
          </div>
        )}
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={isLoading || !isFormValid}
      >
        {isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
            Enviando...
          </>
        ) : (
          'Enviar instrucciones'
        )}
      </button>
    </form>
  );
}