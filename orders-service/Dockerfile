# Dockerfile para orders-service
FROM node:16

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios
COPY package*.json ./
RUN npm install
RUN npm install --global nodemon

# Copiar el resto del código
COPY . .

# Exponer el puerto para orders-service
EXPOSE 4002

# Comando para correr la app
CMD ["npx", "nodemon", "app.js"]
