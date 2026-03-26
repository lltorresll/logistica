import api from "./api";

export interface AppointmentData {
  id?: string;
  scheduled_at: string;
  supplier: string;
  product_line: string;
  observations?: string;
  status?: string;
}

export const appointmentService = {
  getAppointments: async (page: number = 1, filters: any = {}) => {
    const response = await api.get("/appointments/", {
      params: { ...filters, page },
    });
    return response.data;
  },

  getLookups: async () => {
    const response = await api.get("/appointments/lookups/");
    return response.data;
  },

  // Crear
  createAppointment: async (data: AppointmentData) => {
    const response = await api.post("/appointments/", data);
    return response.data;
  },

  // Actualizar
  updateAppointment: async (id: string, data: Partial<AppointmentData>) => {
    const response = await api.patch(`/appointments/${id}/`, data);
    return response.data;
  },

  getEfficiencyReport: async (dateFrom: string, dateTo: string) => {
    const response = await api.get(`/appointments/report/`, {
      params: { date_from: dateFrom, date_to: dateTo },
    });
    return response.data;
  },
};
