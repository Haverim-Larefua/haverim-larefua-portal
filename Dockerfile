# Stage #1 - Get node and build
FROM node AS node_package
RUN mkdir -p /opt/app/hl_fe
WORKDIR /opt/app/hl_fe
#COPY  package* ./
RUN npm install
RUN npm install yarn
RUN yarn build

# Stage #2 - Copy data and run
FROM node:alpine
ENV APP_PATH=/opt/app/hl_fe
RUN apk add bash
RUN mkdir -p /opt/app/hl_fe/
WORKDIR /opt/app/hl_fe
COPY . .
COPY --from=0 /opt/app/hl_fe/node_modules ./node_modules
EXPOSE 3000
ENTRYPOINT ${APP_PATH}/scripts/startService.sh