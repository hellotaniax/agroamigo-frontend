# --- ETAPA 1: Construcción (Build) ---
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# ### INYECCIÓN DE VARIABLES (ESTO FALTABA) ###
# 1. Definimos que esperamos recibir estos argumentos
ARG REACT_APP_API_APP_URL
ARG REACT_APP_API_AUTH_URL

# 2. Los convertimos en variables de entorno para el build de React
ENV REACT_APP_API_APP_URL=$REACT_APP_API_APP_URL
ENV REACT_APP_API_AUTH_URL=$REACT_APP_API_AUTH_URL
# #############################################

RUN npm run build

# --- ETAPA 2: Producción (Run) ---
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
# Asegúrate si es 'build' o 'dist' según tu package.json
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]