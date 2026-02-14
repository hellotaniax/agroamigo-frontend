import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import { validateEmail, validatePassword } from '../../utils/validation';

export default function useLogin(initialValues = { email: '', password: '', remember: false }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

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
      await authService.login(formData.email, formData.password, formData.remember);

      // Si no marca 'remember' guardamos en sessionStorage (vía authService)
      // NO agregamos un listener a beforeunload porque dispara también en reload,
      // lo que provocaba que recargar la página cerrara la sesión.

      navigate('/dashboard');
    } catch (err) {
      const message =
        err.response?.data?.message || 'Credenciales incorrectas o error del servidor';

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const isEmailValid = validateEmail(formData.email);
  const isPasswordValid = validatePassword(formData.password);
  const isFormValid = formData.email && formData.password && isEmailValid && isPasswordValid;

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
  };
}
