# Dockerfile para el api-gateway
FROM node:14

# Crear el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install

RUN npm install --save-dev nodemon

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto 3000 para el api-gateway
EXPOSE 3000

# Comando para ejecutar el servidor de gateway
CMD ["npx","nodemon", "server.js"]
