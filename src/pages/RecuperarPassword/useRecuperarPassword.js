
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';

export default function useRecuperarPassword() {
  const navigate = useNavigate();

  const [paso, setPaso] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState('');
  const [passwordNueva, setPasswordNueva] = useState('');
  const [passwordConfirmar, setPasswordConfirmar] = useState('');
  const [tipo, setTipo] = useState('app');
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const handleSolicitarCodigo = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    if (!authService.validarEmail(email)) {
      setError('Ingresa un email válido');
      return;
    }

    setLoading(true);

    try {
      const response = await authService.solicitarRecuperacion(email, tipo);
      setMensaje(response.message || 'Código enviado.');
      setPaso(2);
    } catch (err) {
      setError(err.message || 'Error al enviar el código');
    } finally {
      setLoading(false);
    }
  };

  const handleVerificarCodigo = (e) => {
    e.preventDefault();
    setError('');

    const validacion = authService.validarCodigo(codigo);

    if (!validacion.valido) {
      setError(validacion.mensaje);
      return;
    }

    setPaso(3);
  };

  const handleRestablecerPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    const validacion = authService.validarPassword(passwordNueva);

    if (!validacion.valida) {
      setError(validacion.mensaje);
      return;
    }

    if (passwordNueva !== passwordConfirmar) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      const response = await authService.restablecerPassword(
        email,
        codigo,
        passwordNueva,
        tipo
      );

      setMensaje(response.message || 'Contraseña restablecida');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Error al restablecer contraseña');
    } finally {
      setLoading(false);
    }
  };

  const handleVolver = () => {
    setError('');
    setMensaje('');
    if (paso > 1) setPaso(paso - 1);
  };

  return {
    paso,
    loading,
    error,
    mensaje,
    email,
    codigo,
    passwordNueva,
    passwordConfirmar,
    tipo,
    mostrarPassword,
    setEmail,
    setCodigo,
    setPasswordNueva,
    setPasswordConfirmar,
    setTipo,
    setMostrarPassword,
    handleSolicitarCodigo,
    handleVerificarCodigo,
    handleRestablecerPassword,
    handleVolver,
  };
}
