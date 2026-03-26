import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (!response) {
      toast.error("Error de conexión", {
        description: "El servidor no responde. ¿Mano, prendiste el Docker?",
      });
    }
    else if (response.status === 401) {
      if (
        typeof window !== "undefined" &&
        window.location.pathname !== "/login"
      ) {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");

        toast.error("Sesión expirada", {
          description: "Por seguridad, ingresa tus credenciales de nuevo.",
        });

        window.location.href = "/login";
      }
    }
    else if (response.status >= 500) {
      toast.error("Error en el servidor", {
        description: "El backend sacó la mano. Revisá los logs del contenedor.",
      });
    }

    return Promise.reject(error);
  },
);

export default api;
