
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
    <form onSubmit={handleRestablecerPassword} className="space-y-6">

      {/* Nueva contraseña */}
      <div>
        <label
          htmlFor="passwordNueva"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Nueva contraseña
        </label>

        <div className="relative">
          <input
            id="passwordNueva"
            type={mostrarPassword ? 'text' : 'password'}
            value={passwordNueva}
            onChange={(e) => setPasswordNueva(e.target.value)}
            required
            placeholder="Mínimo 6 caracteres"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <button
            type="button"
            onClick={() => setMostrarPassword(!mostrarPassword)}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
          >
            {mostrarPassword ? '🙈' : '👁️'}
          </button>
        </div>
      </div>

      {/* Confirmar contraseña */}
      <div>
        <label
          htmlFor="passwordConfirmar"
          className="block text-sm font-medium text-gray-700 mb-2"
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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex space-x-3">
        <button
          type="button"
          onClick={handleVolver}
          disabled={loading}
          className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Volver
        </button>

        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? 'Guardando...' : 'Restablecer'}
        </button>
      </div>

    </form>
  );
}
