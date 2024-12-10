FROM node:18-alpine

WORKDIR /app

COPY . .

ENV VITE_BACKEND_URL=http://localhost:3001

EXPOSE 5173

RUN npm ci

CMD ["npm", "run", "dev"]

