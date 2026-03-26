import { useState, useEffect } from "react";
import { appointmentService } from "@/services/appointmentService";
import api from "@/services/api";
import { toast } from "sonner";

export function useDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [stats, setStats] = useState({
    total_appointments: 0,
    avg_delay_hours: 0,
  });
  const [options, setOptions] = useState({ suppliers: [], product_lines: [] });
  const [filters, setFilters] = useState({
    supplier: "",
    status: "",
    product_line: "",
    date_from: "",
    date_to: "",
  });

  const loadData = async () => {
    try {
      const [statsRes, appData] = await Promise.all([
        api.get("/appointments/stats/"),
        appointmentService.getAppointments(currentPage, filters),
      ]);
      setStats(statsRes.data);
      setAppointments(appData.results);
      setTotalItems(appData.count);
    } catch (e) {
      console.error("Error cargando dashboard", e);
    }
  };

  useEffect(() => {
    appointmentService.getLookups().then(setOptions);
  }, []);

  useEffect(() => {
    loadData();
  }, [currentPage, filters]);

  const handleSuccess = (msg: string) => {
    loadData();
    toast.success(msg);
  };

  return {
    appointments,
    totalItems,
    currentPage,
    setCurrentPage,
    stats,
    options,
    filters,
    setFilters,
    handleSuccess,
    loadData,
  };
}
