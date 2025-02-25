# Usar una imagen base de Node.js (versión LTS)
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json (si lo tienes) para instalar dependencias
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto que utiliza la aplicación (por defecto 3000)
EXPOSE 3000

# Comando para levantar la aplicación en modo producción
CMD ["npm", "run", "start:dev"]
