
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
        <label
          htmlFor="passwordNueva"
          className="form-label"
        >
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
            className="form-control"
          />
          
          {/* Botón de ojo posicionado absolutamente */}
          <button
            type="button"
            onClick={() => setMostrarPassword(!mostrarPassword)}
            className="toggle-password-btn"
            style={{ position: 'absolute', right: 0, top: 0, height: '100%', borderLeft: 'none', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          >
            {mostrarPassword ? '🙈' : '👁️'}
          </button>
        </div>
      </div>

      {/* Confirmar contraseña */}
      <div className="form-group mb-4">
        <label
          htmlFor="passwordConfirmar"
          className="form-label"
        >
          Confirmar contraseña
        </label>

        <input
          id="passwordConfirmar"
          type={mostrarPassword ? 'text' : 'password'}
          value={passwordConfirmar}
          onChange={(e) => setPasswordConfirmar(e.target.value)}
          required
          placeholder="Repite tu contraseña"
          className="form-control"
        />
      </div>

      {/* Botones de acción */}
      <div className="recovery-actions-group">
        <button
          type="button"
          onClick={handleVolver}
          disabled={loading}
          className="btn-back"
        >
          Volver
        </button>

        <button
          type="submit"
          disabled={loading}
          className="login-btn w-100"
        >
          {loading ? 'Guardando...' : 'Restablecer'}
        </button>
      </div>

    </form>
  );
}
