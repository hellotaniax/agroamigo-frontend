export default function StepEmailForm({
  email,
  loading,
  setEmail,
  handleSolicitarCodigo,
}) {
  return (
    <form onSubmit={handleSolicitarCodigo} className="space-y-6">

      <div>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="tu@email.com"
          className="form-control form-control-lg"
        />
      </div>

      <div className="text-center mt-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-block py-2 px-4 rounded-lg transition-colors font-medium recuperar-btn"
        >
          {loading ? 'Enviando...' : 'Enviar código'}
        </button>
      </div>

    </form>
  );
}
