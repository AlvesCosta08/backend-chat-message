FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001

# Certifique-se de que NODE_ENV=production (opcional, mas recomendado para produção)
ENV NODE_ENV=production

CMD ["node", "src/server.js"]