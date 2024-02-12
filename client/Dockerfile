# Étape de construction
FROM node:16 as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

# Étape de déploiement
FROM nginx:1.25-alpine-slim

# Copier la config Nginx
COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 3000 pour le serveur web
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
