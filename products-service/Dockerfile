# Dockerfile para products-service
FROM node:14

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto para products-service
EXPOSE 4001

# Comando para correr la app
CMD ["node", "app.js"]
