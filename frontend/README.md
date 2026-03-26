# ⚛️ Frontend - Interfaz y Experiencia de Usuario (UX)

La interfaz fue desarrollada con **Next.js 16** (App Router), aprovechando las ventajas de Server Components para la carga inicial y Client Components para la interactividad del Dashboard.

## 🛠️ Especificaciones Técnicas
- **Gestión de Estado:** Uso de React Hooks (`useState`, `useEffect`) y Context API para el manejo de la sesión y filtros globales.
- **Estilos:** Diseño responsivo y moderno utilizando **Tailwind CSS**, optimizado escritorio.
- **Comunicación:** Integración con la API mediante **Axios**, incluyendo interceptores para el manejo de errores globales (401 Unauthorized, 500 Server Error).

## 📈 Visualización de Datos
- **Dashboard Analítico:** Implementación de **Recharts** para renderizar métricas de eficiencia en tiempo real.
- **Filtros Avanzados:** Sistema de filtrado por rango de fechas, estados y líneas de producto que sincroniza la URL con el estado de la aplicación para permitir búsquedas persistentes.

## 🧪 Pruebas de UI
- **Jest & React Testing Library:** Pruebas de componentes enfocadas en la interacción del usuario (ej. apertura de modales, validación de formularios y visualización de datos de usuario).
- **Tipado Estricto:** Uso de interfaces de **TypeScript** para asegurar que la comunicación con la API sea robusta y libre de errores de tipo.