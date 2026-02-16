export default function StepEmailForm({
  email,
  loading,
  setEmail,
  handleSolicitarCodigo,
}) {
  return (
    <form onSubmit={handleSolicitarCodigo} className="login-form">

      <div className="form-group">
        <label htmlFor="email" className="form-label">
           Correo Electrónico
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="tu@email.com"
          className="form-control form-control-lg"
          onInvalid={(e) => e.target.setCustomValidity('Por favor, completa este campo.')}
          onInput={(e) => e.target.setCustomValidity('')}
        />
      </div>

      {/* El div text-center recibirá el margin-top: 64px del CSS */}
      <div className="text-center">
        <button
          type="submit"
          disabled={loading}
          className="login-btn w-100"
        >
          {loading ? 'Enviando...' : 'Enviar código'}
        </button>
      </div>

    </form>
  );
}
