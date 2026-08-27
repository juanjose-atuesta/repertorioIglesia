FROM node:20-slim

WORKDIR /app

# Copiamos primero solo los package.json para aprovechar la cache de Docker
COPY package*.json ./
RUN npm install --production

# Copiamos el resto del código
COPY . .

# Por si el contenedor arranca sin volumen montado (evita el error ENOENT)
RUN mkdir -p images data

EXPOSE 3001

CMD ["node", "index.js"]
