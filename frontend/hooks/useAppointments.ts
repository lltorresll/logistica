import { useState, useEffect, useCallback } from 'react';
import { appointmentService } from '../services/appointmentService';

export const useAppointments = (filters = {}) => {
  const [appointments, setAppointments] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const loadAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const data = await appointmentService.getAppointments(1, filters);
      setAppointments(data);
    } catch (error) {
      console.error("Error cargando citas:", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const createAppointment = async (formData: any) => {
    try {
      await appointmentService.createAppointment(formData);
      await loadAppointments();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  return { 
    appointments, 
    loading, 
    createAppointment,
    refresh: loadAppointments
  };
};