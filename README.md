# 💰 Mis Finanzas

Aplicación web de gestión financiera personal para llevar el control de ingresos y gastos, con dashboard, gráficos y filtrado por categorías. Backend en **Spring Boot** con API REST, frontend en **HTML/CSS/JavaScript vanilla**.

🔗 **Demo en producción:** [https://marcosromadev.github.io/ProyectoFinanzas/](https://marcosromadev.github.io/ProyectoFinanzas/)

> ⚠️ El backend está desplegado en el free tier de Render, que "duerme" tras un rato de inactividad. La primera petición tras un periodo sin uso puede tardar **20-30 segundos** en responder mientras el servicio despierta — no es un fallo, es una limitación del plan gratuito. Las siguientes peticiones son instantáneas.

---

## ✨ Funcionalidades

- **Dashboard** con resumen de ingresos totales, gastos totales y balance neto
- **Gráficos** (Chart.js): ingresos vs. gastos y distribución de gastos por categoría
- **CRUD completo de transacciones**: crear, editar, eliminar y listar
- **Filtrado** de transacciones por categoría
- **Ordenación** por fecha (ascendente / descendente)
- Colores por categoría consistentes entre la tabla y los gráficos

---

## 🛠️ Stack técnico

| Capa      | Tecnología                                                                 |
|-----------|-----------------------------------------------------------------------------|
| Frontend  | HTML5, CSS3, JavaScript (ES Modules, sin frameworks), Chart.js               |
| Backend   | Java 17, Spring Boot, Spring Data JPA                                        |
| Base de datos | H2 en memoria                                                            |
| Despliegue| Backend en **Render** (Docker) · Frontend en **GitHub Pages** (GitHub Actions) |

---

## 📁 Estructura del repositorio

Es un monorepo con el frontend y el backend como carpetas independientes:

```
ProyectoFinanzas/
├── finanzas-frontend/       # HTML, CSS y JS del cliente
│   ├── index.html
│   ├── css/
│   ├── js/
│   │   ├── main.js          # Punto de entrada, orquesta servicios y vistas
│   │   ├── services/        # Llamadas fetch a la API (transaction, category)
│   │   └── components/      # Renderizado del DOM y gráficos
│   └── assets/
├── finanzas-backend/        # API REST en Spring Boot
│   ├── src/main/java/.../
│   │   ├── controller/       # Endpoints REST
│   │   ├── entity/           # Entidades JPA (Transaction, Category)
│   │   ├── repository/       # Repositorios Spring Data
│   │   └── config/           # Configuración CORS
│   ├── src/main/resources/
│   │   ├── schema.sql        # Definición de tablas
│   │   ├── data.sql          # Datos de ejemplo precargados
│   │   └── application.properties
│   └── Dockerfile
└── .github/workflows/
    └── deploy-pages.yml      # CI/CD del frontend a GitHub Pages
```

---

## 📡 API REST

Base URL en producción: `https://proyectofinanzas-x5wl.onrender.com`

### Transacciones — `/api/transactions`

| Método | Ruta                    | Descripción                                                            |
|--------|-------------------------|-------------------------------------------------------------------------|
| GET    | `/api/transactions`     | Lista transacciones. Query params: `sortField`, `direction` (`asc`/`desc`), `categoryId` (opcional) |
| POST   | `/api/transactions`     | Crea una nueva transacción                                              |
| PUT    | `/api/transactions/{id}`| Actualiza una transacción existente                                     |
| DELETE | `/api/transactions/{id}`| Elimina una transacción                                                  |

### Categorías — `/api/categories`

| Método | Ruta               | Descripción              |
|--------|---------------------|---------------------------|
| GET    | `/api/categories`   | Lista todas las categorías |
| POST   | `/api/categories`   | Crea una nueva categoría  |

### Modelo de datos

```
Category
├── id: Long
├── name: String
└── color: String (hex, usado para badges y gráficos)

Transaction
├── id: Long
├── description: String
├── amount: BigDecimal
├── type: String ("INGRESO" | "GASTO")
├── date: LocalDate
└── category: Category (relación @ManyToOne)
```

---

## 🚀 Cómo ejecutarlo en local

### Backend

Requiere Java 17 y no necesita instalar nada más gracias al wrapper de Maven incluido.

```bash
cd finanzas-backend
./mvnw spring-boot:run
```

Queda escuchando en `http://localhost:8080`. La base de datos H2 se crea en memoria y se rellena automáticamente con los datos de `data.sql` en cada arranque (al reiniciar, los datos vuelven al estado inicial).

### Frontend

El frontend es estático, no necesita build ni instalación de dependencias. Basta con servirlo con cualquier servidor local (por ejemplo, la extensión **Live Server** de VS Code) para evitar problemas de CORS con `file://`.

```bash
cd finanzas-frontend
# Abrir index.html con Live Server, normalmente en http://localhost:5500
```

> Por defecto, `finanzas-frontend/js/services/*.service.js` apunta a la API desplegada en Render, no a `localhost:8080`. Para trabajar contra el backend en local, cambia temporalmente el valor de `API_URL` en `transaction.service.js` y `category.service.js`.

---

## ☁️ Despliegue

### Backend → Render

El backend se despliega como **Web Service Docker** en Render, apuntando a `finanzas-backend/Dockerfile` (build multi-stage: compila con Maven en una imagen con JDK y copia solo el `.jar` final a una imagen con JRE, para que el resultado sea ligero). Render asigna el puerto dinámicamente vía la variable de entorno `PORT`, que Spring Boot recoge gracias a `server.port=${PORT:8080}` en `application.properties`.

Cada push a `main` que toque `finanzas-backend/` dispara un redespliegue automático en Render.

### Frontend → GitHub Pages

GitHub Pages no permite publicar directamente una subcarpeta de un monorepo, así que el despliegue se hace vía GitHub Actions (`.github/workflows/deploy-pages.yml`): en cada push a `main` que toque `finanzas-frontend/`, el workflow empaqueta esa carpeta y la publica en Pages.

### CORS

El backend solo acepta peticiones desde los orígenes permitidos explícitamente en `WebConfig.java`: `localhost:5500` (desarrollo local) y el dominio de GitHub Pages (producción). Si el frontend se sirve desde otro origen, hay que añadirlo ahí.

---

## 🗺️ Próximos pasos

Este proyecto forma parte de un portfolio de aprendizaje en progreso. Próximas fases: migración del frontend a React y del stack de despliegue a Node/Express en paralelo al backend actual.
