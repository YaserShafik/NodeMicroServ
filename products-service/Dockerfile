# Dockerfile para products-service
FROM node:16 

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install
RUN npm install --global nodemon

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 4001

# Comando para ejecutar la aplicación
CMD ["npx", "nodemon", "app.js"]
