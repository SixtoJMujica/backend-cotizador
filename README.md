# Cotizador de Seguros Vehiculares - Backend (NestJS + TypeORM + PostgreSQL + Docker)

## Descripción General

Este backend está desarrollado para un sistema de cotización de seguros vehiculares. Proporciona dos funcionalidades principales:

* Permite a cualquier usuario autenticado cotizar un seguro vehicular.
* Permite a un usuario con rol `admin` gestionar (crear, editar, eliminar) el catálogo de modelos de vehículos.

Todo el backend está construido con **NestJS** y utiliza **TypeORM** como ORM, **PostgreSQL** como base de datos y está contenido y ejecutado con **Docker**.

---

## Tecnologías y Versiones Usadas

| Herramienta | Versión          |
| ----------- | ---------------- |
| Node.js     | v18.x            |
| NPM         | v10.x            |
| NestJS CLI  | 10.x             |
| TypeORM     | ^0.3.x           |
| PostgreSQL  | 15.x (en Docker) |
| Docker      | Latest           |

---

## Estructura del Proyecto (carpeta `/src`)

```
/src
|-- /auth          # Módulo de autenticación (login, JWT, roles)
|-- /user          # Usuario: solo creación inicial y autenticación
|-- /vehicle       # Catálogo de modelos de vehículos (CRUD, solo admin)
|-- /quote         # Cotización de seguros (crear, listar)
|-- /seeds         # Seeds iniciales (usuarios, vehículos)
|-- app.module.ts  # Módulo principal
```

---

## Autenticación y Roles

* Se utiliza JWT para manejar la autenticación.
* Hay dos roles disponibles: `admin` y `user`.
* El token JWT debe enviarse en cada petición protegida mediante el header:

```
Authorization: Bearer <token>
```

**Ejemplo en Postman:**
En la pestaña `Headers`, agregar:

```
Key: Authorization
Value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

**Ejemplo de cuerpo para crear una cotización (POST /quotes):**

```
{
  "brand": "Toyota",
  "model": "Corolla",
  "year": 2022,
  "type": "Sedan",
  "driverAge": 30
}
```

---

## Base de Datos

Se usa **PostgreSQL**, y se levanta mediante un contenedor Docker. Las credenciales y configuraciones están en el archivo `.env`.

---

## Variables de Entorno

Crear un archivo `.env` en la raíz con el siguiente contenido:

```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=quoter
JWT_SECRET=tu_clave_secreta
JWT_EXPIRES_IN=1d
```

---

## Seeds (Carga Inicial de Datos)

Los seeds se encuentran en `src/seeds`.

### Ejecutar Seeds:

```
npx ts-node src/seeds/vehicle.seed.ts
npx ts-node src/seeds/user.seed.ts
```

Asegúrate de tener `ts-node` instalado globalmente o como dependencia:

```
npm install -D ts-node
```

---

## Levantar el Proyecto

### Con Docker (recomendado)

1. Asegúrate de tener Docker y Docker Compose instalados.
2. Ejecuta:

```bash
docker-compose up --build
```

Esto levantará la base de datos y el backend en `http://localhost:3000`.

### Sin Docker (modo desarrollo local)

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar en modo desarrollo:

```bash
npm run start:dev
```

---

## Endpoints Principales

### Auth

* `POST /auth/login` - Devuelve JWT

### Vehicle (requiere rol `admin`)

* `GET /vehicle` - Lista todos los modelos
* `POST /vehicle` - Crear modelo
* `PATCH /vehicle/:id` - Editar modelo
* `DELETE /vehicle/:id` - Eliminar modelo

### Quote

* `POST /quotes` - Crear cotización (usuario autenticado)
* `GET /quotes/last` - Ver últimas cotizaciones propias (usuario autenticado)

**Nota:** Todas las rutas protegidas requieren el header `Authorization: Bearer <token>` para autenticación.

---

## Explicación Técnica (Resumen)

* El backend fue diseñado para dividir responsabilidades por módulos.
* `Auth` se encarga del login y generación del token.
* `User` no tiene CRUD público, solo se usa para autenticar.
* `Vehicle` es administrado por el `admin` y tiene validaciones para evitar duplicados por marca y modelo.
* `Quote` permite cotizar y listar las cotizaciones por usuario.
* Los `seeds` iniciales pueblan la base de datos con usuarios y vehículos.
* Se utilizaron `guards` personalizados para verificar roles.

---

## Licencia

MIT License