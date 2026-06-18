# ms-front

Frontend (portal web) del sistema **Servicio de Salud RedNorte**.

Es la interfaz que consume el equipo de salud para visualizar la información de la plataforma: dashboard, pacientes, citas, lista de espera y reasignaciones. Se comunica **únicamente con el BFF** (Backend For Frontend) vía API REST; nunca llama a los microservicios directamente.

```
ms-front (React) -> bff-gateway -> microservicios
```

---

## Stack tecnológico

| Tecnología | Versión / Detalle |
| --- | --- |
| React | 19 |
| Build / dev server | Vite 8 |
| Estilos | Tailwind CSS 3 |
| Cliente HTTP | axios |
| Ruteo | react-router-dom 7 |

---

## Requisitos previos

- **Node.js** (incluye npm).
- Para ver datos reales, el **bff-gateway** debe estar corriendo en el puerto `8085`, y detrás de él los microservicios (pacientes, citas, lista de espera, reasignación).

---

## Cómo ejecutar

```bash
# Instalar dependencias (solo la primera vez)
npm install

# Levantar el servidor de desarrollo
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

```bash
# Generar la versión de producción
npm run build
```

---

## Conexión con el backend

La URL base del BFF está en `src/api/api.js`:

```js
baseURL: 'http://localhost:8085/api/bff'
```

Todas las peticiones del frontend pasan por el BFF, que orquesta las llamadas a los microservicios y las protege con Circuit Breaker.

---

## Páginas

| Ruta | Página | Consume del BFF |
| --- | --- | --- |
| `/` | Dashboard | `/solicitudes`, `/reasignaciones` |
| `/pacientes` | Pacientes | `/pacientes` |
| `/citas` | Citas | `/citas` |
| `/lista-espera` | Lista de Espera | `/solicitudes` |
| `/reasignacion` | Reasignación | `/reasignaciones` |

---

## Estructura del proyecto

```
src/
├── api/          -> Configuración de axios (api.js)
├── components/   -> Navbar y componentes compartidos
├── pages/        -> Dashboard, Pacientes, Citas, ListaEspera, Reasignacion
├── App.jsx       -> Rutas de la aplicación
└── main.jsx      -> Punto de entrada
```

---

## Equipo

Proyecto académico — Desarrollo Fullstack III (DSY1106), Duoc UC.
Integrantes: **Cristian Tapia** y **Camila Malhue**.
