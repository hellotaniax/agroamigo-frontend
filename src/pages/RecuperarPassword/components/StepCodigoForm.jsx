// pages/RecuperarPassword/components/StepCodigoForm.jsx

export default function StepCodigoForm({
  codigo,
  setCodigo,
  handleVerificarCodigo,
  handleVolver,
}) {
  return (
    <form onSubmit={handleVerificarCodigo} className="space-y-6">

      <div>
        <label
          htmlFor="codigo"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Código de verificación
        </label>

        <input
          id="codigo"
          type="text"
          value={codigo}
          onChange={(e) =>
            setCodigo(e.target.value.replace(/\D/g, '').slice(0, 6))
          }
          required
          maxLength={6}
          placeholder="000000"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest"
        />

        <p className="mt-2 text-xs text-gray-500 text-center">
          Ingresa el código de 6 dígitos enviado a tu correo
        </p>
      </div>

      <div className="flex space-x-3">
        <button
          type="button"
          onClick={handleVolver}
          className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          Volver
        </button>

        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Continuar
        </button>
      </div>

    </form>
  );
}
