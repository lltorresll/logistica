# 🐍 Backend - Arquitectura y Lógica de Negocio

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