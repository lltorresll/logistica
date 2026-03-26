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

- # 🐍 Backend - Arquitectura y Lógica de Negocio

El sistema está construido con **Django  4.2.29.** y **Django REST Framework**, enfocado en la seguridad de los datos y el procesamiento eficiente en el lado del servidor.

## 🛠️ Especificaciones Técnicas
- **Autenticación:** Gestión de usuarios mediante Django Auth con persistencia en PostgreSQL.
- **Seguridad (Multi-tenancy):** Se implementó un aislamiento de datos estricto mediante la sobreescritura del método `get_queryset` en los ViewSets. Esto garantiza que un usuario solo pueda ver, editar o eliminar las citas que él mismo ha creado.
- **Automatización:** Uso de señales (Signals) o lógica en el método `perform_update` para gestionar el campo `delivered_at` automáticamente cuando el estado cambia a "Entregada".

## 📊 Optimización SQL
Para el reporte de eficiencia, se evitó la carga computacional del ORM mediante el uso de **SQL Nativo**. 
- Se utilizó `EXTRACT(EPOCH FROM ...)` para calcular la diferencia exacta en segundos entre la fecha programada y la entrega directamente en la base de datos.
- Esto reduce drásticamente el consumo de memoria del servidor al procesar grandes volúmenes de datos.

## 🧪 Pruebas de Integridad
- **Tests Unitarios:** Pruebas de seguridad que validan el aislamiento de registros entre usuarios.
- **Comando de Semilla:** Un script personalizado (`seed_data`) para poblar la base de datos de manera consistente durante la revisión técnica.

# 🛠️ Guía de Comandos y Acceso al Sistema

Seguí estos pasos en orden para poner a correr el proyecto y validar las funcionalidades de administración y seguridad.


## 🚀 Comandos de Inicialización

Ejecutá estos comandos en tu terminal (PowerShell o Bash) desde la raíz del proyecto:

### 1. Levantar el ecosistema (Docker)
Este comando construye las imágenes y levanta los contenedores de PostgreSQL, el Backend (Django) y el Frontend (Next.js).
```bash
docker-compose up --build
docker exec -it appointment-management-system-backend-1 python manage.py seed_data
docker exec -it appointment-management-system-backend-1 python manage.py test appointments
docker exec -it appointment-management-system-frontend-1 npm test

URL de Acceso	http://localhost:3000
Usuario	admin
Contraseña	admin123
