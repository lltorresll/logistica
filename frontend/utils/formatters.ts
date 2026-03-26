import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (dateString: string) => {
  if (!dateString) return '---';
  const date = new Date(dateString);
  return format(date, "dd 'de' MMMM, hh:mm a", { locale: es });
};

export const formatStatus = (status: string) => {
  const statusMap: Record<string, { label: string, color: string }> = {
    'SCHEDULED': { label: 'Programada', color: '#3b82f6' },
    'IN_PROGRESS': { label: 'En Curso', color: '#f59e0b' },
    'DELIVERED': { label: 'Entregada', color: '#10b981' },
    'CANCELLED': { label: 'Cancelada', color: '#ef4444' },
  };
  return statusMap[status] || { label: status, color: '#6b7280' };
};