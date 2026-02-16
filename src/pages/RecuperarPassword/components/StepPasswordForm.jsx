// pages/RecuperarPassword/components/StepPasswordForm.jsx

export default function StepPasswordForm({
  passwordNueva,
  passwordConfirmar,
  mostrarPassword,
  loading,
  setPasswordNueva,
  setPasswordConfirmar,
  setMostrarPassword,
  handleRestablecerPassword,
  handleVolver,
}) {
  return (
    <form onSubmit={handleRestablecerPassword} className="login-form">

      {/* Nueva contraseña */}
      <div className="form-group mb-4">
        <label htmlFor="passwordNueva" className="form-label">
          Nueva contraseña
        </label>

        <div className="input-wrapper">
          <input
            id="passwordNueva"
            type={mostrarPassword ? 'text' : 'password'}
            value={passwordNueva}
            onChange={(e) => setPasswordNueva(e.target.value)}
            required
            placeholder="Mínimo 6 caracteres"
            className="form-control input-with-icon" // Clase extra para padding
            onInvalid={(e) => e.target.setCustomValidity('Por favor, completa este campo.')}
            onInput={(e) => e.target.setCustomValidity('')}
          />
          
          <button
            type="button"
            onClick={() => setMostrarPassword(!mostrarPassword)}
            className="btn-password-toggle"
            title={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {mostrarPassword ? (
              // Ícono de Ojo Tachado (Ocultar)
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            ) : (
              // Ícono de Ojo Normal (Mostrar)
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Confirmar contraseña */}
      <div className="form-group mb-4">
        <label htmlFor="passwordConfirmar" className="form-label">
          Confirmar contraseña
        </label>

        {/* Nota: Generalmente el campo de confirmar no lleva el ojo, 
            pero si quieres ponerlo, repite la estructura del input-wrapper de arriba */}
        <input
          id="passwordConfirmar"
          type={mostrarPassword ? 'text' : 'password'}
          value={passwordConfirmar}
          onChange={(e) => setPasswordConfirmar(e.target.value)}
          required
          placeholder="Repite tu contraseña"
          className="form-control"
          onInvalid={(e) => e.target.setCustomValidity('Por favor, completa este campo.')}
          onInput={(e) => e.target.setCustomValidity('')}
        />
      </div>

      {/* Botones de acción */}
      <div className="recovery-actions-group">
        <button type="button" onClick={handleVolver} disabled={loading} className="btn-back">
          VOLVER
        </button>
        <button type="submit" disabled={loading} className="login-btn w-100">
          {loading ? 'GUARDANDO...' : 'RESTABLECER'}
        </button>
      </div>

    </form>
  );
}