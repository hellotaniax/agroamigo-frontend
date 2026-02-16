import { useState } from 'react';
import authService from '../../services/auth.service';

export default function useForgotPassword() {
  const [formData, setFormData] = useState({ email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = formData.email && validateEmail(formData.email);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsValidating(true);
    
    if (!isFormValid) {
      setError('Por favor ingresa un correo electrónico válido');
      setIsValidating(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      console.log('📧 Enviando email:', formData.email); // ← LOG 1
      
      const response = await authService.forgotPassword(formData.email);
      
      console.log('✅ Respuesta del servidor:', response); // ← LOG 2
      
      setSuccess(true);
    } catch (err) {
      console.error('❌ Error completo:', err); // ← LOG 3
      console.error('❌ Error response:', err.response); // ← LOG 4
      
      setError(
        err.response?.data?.message || 
        err.response?.data?.error ||
        'No se pudo enviar el correo. Verifica que el email esté registrado.'
      );
    } finally {
      setIsLoading(false);
      setIsValidating(false);
    }
  };

  const clearError = () => setError(null);

  return {
    formData,
    isLoading,
    error,
    success,
    isValidating,
    handleInputChange,
    handleSubmit,
    clearError,
    isFormValid,
  };
}