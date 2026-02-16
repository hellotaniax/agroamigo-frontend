// pages/RecuperarPassword/components/StepCodigoForm.jsx

export default function StepCodigoForm({
  codigo,
  setCodigo,
  handleVerificarCodigo,
  handleVolver,
}) {
  return (
    <form onSubmit={handleVerificarCodigo} className="login-form">

      {/* Grupo centrado: Etiqueta arriba, input abajo */}
      <div className="form-group-centered">
        <label
          htmlFor="codigo"
          className="form-label" 
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
          className="form-control input-code-centered"
        />

        <p className="form-text text-center mt-3 text-muted">
          Ingresa el código de 6 dígitos enviado a tu correo
        </p>
      </div>

      {/* Grupo de botones separados */}
      <div className="recovery-actions-group">
        <button
          type="button"
          onClick={handleVolver}
          className="btn-back" 
        >
          Volver
        </button>

        <button
          type="submit"
          className="login-btn w-100" 
        >
          Continuar
        </button>
      </div>

    </form>
  );
}
