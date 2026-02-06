import './Login.css';

export default function LoginPage() {
  return (
    <div className="login-page d-flex justify-content-center align-items-center">
      <form className="login-form p-4 rounded shadow">
        <h3 className="mb-4">AgroAmigo Login</h3>
        <input type="text" placeholder="Usuario" className="form-control mb-3" />
        <input type="password" placeholder="Contraseña" className="form-control mb-3" />
        <button type="submit" className="btn btn-success w-100">Ingresar</button>
      </form>
    </div>
  );
}
