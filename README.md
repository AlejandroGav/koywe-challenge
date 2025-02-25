
# API de Cotización de Divisas (Fiat ⇄ Crypto) con NestJS

Este proyecto es una aplicación back-end desarrollada con NestJS que expone endpoints REST para convertir divisas fiat y criptomonedas. La solución implementa buenas prácticas de desarrollo, arquitectura modular, el patrón Facade, seguridad con autenticación JWT, pruebas unitarias e integración, y está dockerizada para facilitar su despliegue y evaluación.

## Índice

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos](#requisitos)
- [Configuración de Variables de Entorno](#configuración-de-variables-de-entorno)
- [Levantamiento de la Aplicación](#levantamiento-de-la-aplicación)
- [Ejecutar localmente (sin Docker)](#ejecutar-localmente-sin-docker)
- [Ejecutar con Docker](#ejecutar-con-docker)
- [Ejecución de Pruebas](#ejecución-de-pruebas)
- [Pruebas Unitarias](#pruebas-unitarias)
- [Pruebas de Integración (e2e)](#pruebas-de-integración-e2e)
- [Documentación Adicional](#documentación-adicional)
- [Uso de Herramientas de IA](#uso-de-herramientas-de-ia)
- [Notas](#notas)

## Características

- **Conversión de Divisas:**  
  Endpoints para crear y consultar cotizaciones, calculando el monto convertido usando una tasa obtenida (en esta ocasion de forma simulada, consultando).

- **Seguridad:**  
  Implementación de autenticación con JWT para proteger los endpoints.  
  Endpoints para registro y login.

- **Arquitectura Modular y Patrones de Diseño:**  
  Uso de NestJS con inyección de dependencias, el patrón Facade y aplicación de principios SOLID.

- **Pruebas:**  
  Se incluyen pruebas unitarias e integración (e2e) utilizando Jest y Supertest.

- **Dockerización:**  
  La aplicación y la base de datos MongoDB están contenidas mediante Docker y Docker Compose para facilitar su despliegue y evaluación.

## Tecnologías

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/) y [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/) para autenticación
- [Jest](https://jestjs.io/) para testing
- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/)

## Requisitos

- [Node.js](https://nodejs.org/) (versión LTS recomendada)
- [npm](https://www.npmjs.com/)
- (Opcional) [Docker](https://www.docker.com/) y Docker Compose

## Configuración de Variables de Entorno

La aplicación utiliza varias variables de entorno. Puedes definirlas en un archivo `.env` en la raíz del proyecto o directamente en el archivo `docker-compose.yml` para el entorno dockerizado.

Ejemplo de archivo `.env`:

```
# URI para conexión a MongoDB
MONGO_URI=mongodb://localhost:27017/koywe-challenge

# Clave secreta para JWT
JWT_SECRET=miClaveSuperSecreta!2025
```

**Nota:**  
- En Docker Compose se utiliza el valor definido en la sección `environment` del servicio.  
- Si ejecutas la aplicación localmente (sin Docker) asegúrate de tener un archivo `.env` y cargarlo con `dotenv` en `main.ts`.

Aquí te dejo la sección adicional que puedes incluir en el README, bajo un título como "Consulta a Proveedor de Precios", explicando que en este proyecto se simula la respuesta y cómo se realizaría la consulta real:

---

### Consulta a Proveedor de Precios

La API está diseñada para obtener en tiempo real la tasa de conversión (rate) consultando a un proveedor de precios externo. Por ejemplo, se consideró la siguiente URL para obtener la tasa de conversión:

```
https://api.exchange.cryptomkt.com/api/3/public/price/rate?from={to}&to={from}
```

donde se reemplazarían `{from}` y `{to}` por los códigos de las monedas de origen y destino, respectivamente.

**Implementación Actual (Simulación):**

- **Simulación:**  
  En la implementación actual, se simula la respuesta del proveedor de precios. Esto significa que, en lugar de hacer una llamada HTTP real a la API, se retorna un valor fijo (por ejemplo, `0.0000023`).  
  Esta simulación permite probar la funcionalidad sin depender de la disponibilidad o posibles limitaciones de la API externa.

**Cómo se Realizaría la Consulta Real:**

Para integrar la API real, se podrían seguir estos pasos:

1. **Realizar una solicitud HTTP:**  
   Utilizar una librería como [Axios](https://axios-http.com/) o el módulo nativo `http`/`https` de Node.js para enviar una petición GET a la URL:
   ```typescript
   import axios from 'axios';

   async function getExchangeRate(from: string, to: string): Promise<number> {
     try {
       const response = await axios.get(
         `https://api.exchange.cryptomkt.com/api/3/public/price/rate?from=${to}&to=${from}`
       );
       // Suponiendo que la respuesta tenga la propiedad "rate"
       return response.data.rate;
     } catch (error) {
       // Manejar el error o retornar un valor por defecto
       throw new Error('Error al obtener la tasa de conversión');
     }
   }
   ```
2. **Validar la respuesta:**  
   Se debería validar que la respuesta de la API contenga la información esperada (por ejemplo, verificar que `response.data.rate` exista y sea un número válido).

3. **Integrar en el flujo de negocio:**  
   Reemplazar la lógica de simulación por la llamada a `getExchangeRate` en el servicio o en la fachada (facade) que gestiona la creación de la cotización.

4. **Manejo de errores:**  
   Implementar un manejo adecuado de errores en caso de que la API externa no responda o devuelva un error, incluyendo la posibilidad de simular o retornar un valor por defecto mientras se notifica el problema.


## Levantamiento de la Aplicación

### Ejecutar localmente (sin Docker)

1. **Instalar dependencias:**

   ```bash
   npm install
   ```

2. **Asegurarte de tener MongoDB corriendo localmente:**  
   Si no lo tienes, puedes instalarlo o ejecutar la versión dockerizada (ver sección Docker).

3. **Iniciar la aplicación en modo desarrollo:**

   ```bash
   npm run start:dev
   ```

La aplicación estará disponible en `http://localhost:3000`.

### Ejecutar con Docker

Este proyecto está dockerizado para facilitar su ejecución sin necesidad de instalar dependencias localmente.

1. **Asegúrate de tener Docker y Docker Compose instalados.**

2. **Verifica que el archivo `docker-compose.yml` esté en la raíz del proyecto.**

3. **Levanta los contenedores:**

   ```bash
   docker-compose up --build
   ```

   Esto hará lo siguiente:
   - Construirá la imagen de la aplicación usando el Dockerfile.
   - Levantará un contenedor para la aplicación (`koywe-app`) en el puerto 3000.
   - Levantará un contenedor para MongoDB (`koywe-mongo`) en el puerto 27017.

4. **Acceder a la aplicación:**  
   La aplicación se conectará a MongoDB usando la URI definida. Para conectarte con MongoDB Compass, utiliza:

   ```
   mongodb://localhost:27017/koywe-challenge
   ```

## Ejecución de Pruebas

Se recomienda eliminar la coleccion de usuarios cada vez que se ejecuten las pruebas.

### Pruebas Unitarias

Para ejecutar las pruebas unitarias, utiliza el siguiente comando:

```bash
npm run test
```

Este comando ejecutará todos los tests unitarios definidos (archivos con extensión `.spec.ts` que no sean e2e).

### Pruebas de Integración (e2e)

Para ejecutar las pruebas de integración (end-to-end):

```bash
npm run test:e2e
```

Si deseas ver la cobertura de código:

```bash
npm run test:cov
```

Las pruebas de integración se encuentran en la carpeta `test/` (por ejemplo, `test/quote.e2e-spec.ts` y `test/auth.e2e-spec.ts`).

## Documentación Adicional

- **Estructura del Proyecto:**  
  La aplicación está organizada en capas:
  - **`src/bll/`:** Lógica de negocio.
  - **`src/dal/`:** Acceso a datos (repositorios y módulos de Mongoose).
  - **`src/facades/`:** Implementación del patrón Facade para centralizar la lógica de negocio.
  - **`src/models/`:** Definición de entidades y DTOs.
  - **`src/providers/`:** Integración con proveedores externos (por ejemplo, API de tasas de cambio).
  - **`src/auth/`:** Módulo de autenticación con JWT (incluye AuthService, JwtStrategy y AuthController).

- **Variables de Entorno:**  
  - `MONGO_URI`: Cadena de conexión a MongoDB.
  - `JWT_SECRET`: Clave secreta para firmar y validar tokens JWT.

- **Dockerización:**  
  La dockerización permite levantar la aplicación y la base de datos en contenedores de forma aislada. Para ello:
  - **Dockerfile:** Define cómo construir la imagen de la aplicación.
  - **docker-compose.yml:** Orquesta los contenedores para la aplicación y MongoDB.
  
  Para levantar los contenedores, usa:
  
  ```bash
  docker-compose up --build
  ```

## Uso de Herramientas de IA

En el desarrollo de esta prueba se utilizó **ChatGPT** como herramienta de apoyo. Se aprovechó ChatGPT para:

- **Asegurar el uso correcto de buenas prácticas** de desarrollo y arquitectura en NestJS.
- **Resolver dudas de teoría específica** y aclarar conceptos relacionados con el patrón Facade, inyección de dependencias y principios SOLID.
- **Definir la estructura y contenido de la documentación** (README) para asegurar que cumple con los requerimientos de la prueba.

El uso de IA sirvió como complemento para mejorar la eficiencia en el desarrollo, siempre respaldado por un entendimiento técnico profundo y la personalización del código desarrollado.

## Notas

- **Seguridad:**  
  La API utiliza autenticación JWT para proteger los endpoints. Los endpoints de registro y login generan y validan tokens. Los endpoints protegidos requieren que se envíe el token en el header `Authorization` con el formato `Bearer <token>`.

- **Testing:**  
  Se han implementado pruebas unitarias e integración para asegurar la calidad del código. Se recomienda ejecutar las pruebas periódicamente para garantizar el correcto funcionamiento de la aplicación.

  Tambien se recomienda eliminar la coleccion de usuarios cada vez que se ejecuten las pruebas.

- **Ambiente de Desarrollo vs Producción:**  
  Las configuraciones actuales están orientadas a un entorno de desarrollo. En producción, se recomienda ajustar la configuración de variables de entorno, habilitar HTTPS y aplicar medidas adicionales de seguridad.

---