# Stage #1 - Get node and build
FROM node:14.5.0 AS build
ARG BACKEND_URL
RUN mkdir -p /opt/app/hl_fe
WORKDIR /opt/app/hl_fe
COPY  package* ./
RUN npm install
COPY . .
RUN sed -i -e "s|process.env.REACT_APP_BACKEND_URL|'$BACKEND_URL'|" /opt/app/hl_fe/src/configuration/Configuration.ts
RUN npm run build

# Stage #2 - Copy data and run
FROM nginx
COPY --from=build /opt/app/hl_fe/build /usr/share/nginx/html
COPY ./scripts/nginx-custom.conf /etc/nginx/conf.d/default.conf