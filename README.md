# 🗳️ Sistema de Votaciones - API REST

API REST desarrollada con **Node.js**, **Fastify**, **TypeScript** y **PostgreSQL** para gestionar un sistema de votaciones.

## Tecnologías

- Node.js
- TypeScript
- Fastify
- PostgreSQL
- Zod
- Swagger

---

# Requisitos

Antes de ejecutar el proyecto debes tener instalado:

- Node.js 20+
- npm
- PostgreSQL
- Git

---

# Instalación

## 1. Clonar el proyecto

```bash
git clone <url-del-repositorio>
cd proyecto-votaciones
```

## 2. Instalar dependencias

```bash
npm install
```

---

# Variables de entorno

El proyecto utiliza un archivo `.env`.

Ejemplo:

```env
DATABASE_URL="postgresql://usuario:password@host:5432/database"

PORT=3000
```

# Ejecutar migraciones

Antes de iniciar el servidor es necesario crear las tablas.

```bash
npm run migrate
```

---

# Ejecutar el proyecto

Modo desarrollo

```bash
npm run dev
```

La API estará disponible en

```
http://localhost:3000
```

---

# Documentación de la API

## Votantes

### Crear votante

**POST**

```
/voters
```

Body

```json
{
    "name": "Juan Perez",
    "email": "juan@email.com"
}
```

---

### Obtener todos los votantes

**GET**

```
/voters
```

---

### Obtener votante por ID

**GET**

```
/voters/:id
```

---

### Buscar votante por nombre

**GET**

```
/voters/search?name=Juan Perez
```

---

### Eliminar votante

**DELETE**

```
/voters/:id
```

---

# Candidatos

## Crear candidato

**POST**

```
/candidates
```

Body

```json
{
    "name":"Carlos López",
    "proposal":"Mejorar la infraestructura"
}
```

---

## Obtener candidatos

**GET**

```
/candidates
```

---

## Obtener candidato por ID

**GET**

```
/candidates/:id
```

---

## Eliminar candidato

**DELETE**

```
/candidates/:id
```

---

# Votos

## Registrar voto

**POST**

```
/votes
```

Ejemplo

```json
{
    "voterId":1,
    "candidateId":2
}
```

---

## Obtener votos

**GET**

```
/votes
```

---

## Obtener estadísticas

**GET**

```
/votes/statistics
```

---

# Ejemplos usando cURL

## Crear un votante

```bash
curl -X POST http://localhost:3000/voters \
-H "Content-Type: application/json" \
-d '{
    "name":"Juan Perez",
    "email":"juan@email.com"
}'
```

---

## Obtener votantes

```bash
curl http://localhost:3000/voters
```

---

## Crear candidato

```bash
curl -X POST http://localhost:3000/candidates \
-H "Content-Type: application/json" \
-d '{
    "name":"Carlos López",
    "proposal":"Modernizar el campus"
}'
```

---

## Obtener candidatos

```bash
curl http://localhost:3000/candidates
```

---

## Registrar voto

```bash
curl -X POST http://localhost:3000/votes \
-H "Content-Type: application/json" \
-d '{
    "voterId":1,
    "candidateId":2
}'
```

---

## Obtener estadísticas

```bash
curl http://localhost:3000/votes/statistics
```

---

# Estructura del proyecto

```
src/
│
├── config/
├── common/
├── db/
│   └── migrations/
│
├── modules/
│   ├── voters/
│   ├── candidates/
│   └── votes/
│
├── app.ts
└── server.ts
```

---

# Colección de Postman

Dentro del proyecto se encuentra la colección:

```
docs/
└── sistema de votaciones.postman_collection.json
```

Puede importarse directamente en Postman para probar todos los endpoints.

---

## Resultado del endpoint de estadísticas

![Resultado Estadísticas](./Resultado_Estadisticas_Votos.png)
```
