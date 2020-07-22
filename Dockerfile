# Stage #1 - Get node and build
FROM node AS node_package
RUN mkdir -p /opt/app/hl_fe
WORKDIR /opt/app/hl_fe
COPY  package* ./
RUN npm install
RUN npm install yarn
RUN npm rebuild node-sass


# Stage #2 - Copy data and run
FROM node:alpine
ENV APP_PATH=/opt/app/hl_fe
RUN apk add bash
RUN mkdir -p /opt/app/hl_fe/
WORKDIR /opt/app/hl_fe
COPY . .
COPY --from=0 /opt/app/hl_fe/node_modules ./node_modules
RUN npm rebuild node-sass
RUN yarn build
EXPOSE 3000
RUN chmod 755 ${APP_PATH}/scripts/startService.sh
# ENTRYPOINT ${APP_PATH}/scripts/startService.sh
ENTRYPOINT ${APP_PATH}/build.sh
