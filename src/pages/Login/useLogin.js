import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import { validateEmail, validatePassword } from '../../utils/validation';

export default function useLogin(initialValues = { email: '', password: '', remember: false }) {
  const navigate = useNavigate();

  const [formData, setFormData]         = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading]       = useState(false);
  const [error, setError]               = useState('');
  const [isValidating, setIsValidating] = useState({});

  // Estado atómico de bloqueo — evita renders intermedios con valores inconsistentes
  const [estadoBloqueo, setEstadoBloqueo] = useState({ bloqueado: false, bloqueadoHasta: null });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (name === 'email') {
      setIsValidating((prev) => ({
        ...prev,
        email: value.length > 0 ? !validateEmail(value) : false,
      }));
    }

    if (name === 'password') {
      setIsValidating((prev) => ({
        ...prev,
        password: value.length > 0 ? value.length < 6 : false,
      }));
    }

    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos requeridos');
      return;
    }
    if (!validateEmail(formData.email)) {
      setError('Por favor ingresa un correo electrónico válido');
      return;
    }
    if (!validatePassword(formData.password)) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await authService.login(formData.email, formData.password, 'app', formData.remember);
      navigate('/dashboard');

    } catch (err) {
      const data = err.response?.data;

      if (data?.bloqueado) {
        setEstadoBloqueo({
          bloqueado: true,
          bloqueadoHasta: data.bloqueado_hasta ? new Date(data.bloqueado_hasta) : null,
        });
        setError(data.message);
      } else {
        setEstadoBloqueo({ bloqueado: false, bloqueadoHasta: null });
        setError(data?.message || 'Credenciales incorrectas o error del servidor');
      }

    } finally {
      setIsLoading(false);
    }
  };

  const handleDesbloqueo = () => {
    setEstadoBloqueo({ bloqueado: false, bloqueadoHasta: null });
    setError('');
  };

  const isEmailValid    = validateEmail(formData.email);
  const isPasswordValid = validatePassword(formData.password);
  const isFormValid     = formData.email && formData.password && isEmailValid && isPasswordValid;

  return {
    formData,
    setFormData,
    showPassword,
    setShowPassword,
    isLoading,
    error,
    isValidating,
    handleInputChange,
    handleSubmit,
    isFormValid,
    toggleShowPassword: () => setShowPassword((s) => !s),
    clearError: () => setError(''),
    bloqueado:      estadoBloqueo.bloqueado,
    bloqueadoHasta: estadoBloqueo.bloqueadoHasta,
    handleDesbloqueo,
  };
}