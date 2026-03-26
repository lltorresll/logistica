import axios from 'axios';

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data;

    if (status === 401) return 'Credenciales incorrectas o sesión expirada.';
    if (status === 403) return 'No tienes permisos para esta acción.';
    if (status === 404) return 'Recurso no encontrado.';
    if (status && status >= 500) return 'Error interno del servidor.';

    if (data && typeof data === 'object') {
      if (data.detail) return data.detail;
      const firstKey = Object.keys(data)[0];
      const firstError = (data as any)[firstKey];
      if (Array.isArray(firstError)) {
        return `${firstKey}: ${firstError[0]}`;
      }
    }
  }
  
  if (error instanceof Error) return error.message;
  return 'Ocurrió un error inesperado.';
};