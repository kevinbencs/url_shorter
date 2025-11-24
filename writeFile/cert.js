import { writeFileSync } from 'fs';


const docker = `
services:

  traefik:
    image: traefik:v3.1
    command:
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--providers.file.filename=/etc/traefik/dynamic.yml"
      - "--log.level=INFO"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock:ro"
      - "./letsencrypt:/letsencrypt"
      - "./certs:/certs:ro"
      - "./traefik.yml:/etc/traefik/traefik.yml:ro"
      - "./dynamic.yml:/etc/traefik/dynamic.yml:ro"
    restart: unless-stopped

  

  gateway:
    build: 
      context: ./gateway
    command: "npm run start"
    expose:
      - "80"
    mem_limit: 512m
    cpus: 0.5
    depends_on:
      - api
      - pages
      - redirect
    environment:
      - NODE_ENV=production
      - REDIRECT_PORT=3002
      - API_PORT=3001
      - FRONTEND_PORT=3003
      - PORT=80
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.gateway.rule=PathPrefix(`/`)"
      - "traefik.http.routers.gateway.entrypoints=websecure"
      - "traefik.http.routers.gateway.tls=true"
      - "traefik.http.services.gateway.loadbalancer.server.port=80"

  
  api:
    build: 
      context: ./backend/api
    command: "npm run start"
    expose:
      - "3001"
    mem_limit: 1g
    cpus: 1
    depends_on:
      - postgres
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - PORT=3001
      - SECRET=${SECRET}
      - SECRET_COOKIE=${SECRET_COOKIE}

  migrate:
    build:
      context: ./backend/migrate
    command: sh -c " npx prisma migrate db push"
    depends_on:
      - postgres
    environment:
      - DATABASE_URL=${DATABASE_URL}


  pages:
    build:
      context: .
      dockerfile: backend/pages/Dockerfile
    command: "npm run start"
    expose:
      - "3003"
    mem_limit: 512m
    cpus: 0.5
    depends_on:
      - postgres
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - PORT=3003
      - SECRET=${SECRET}
      - SECRET_COOKIE=${SECRET_COOKIE}


  redirect:
    build: 
      context: ./backend/redirect
    command: "npm run start"
    expose:
      - "3002"
    mem_limit: 512m
    cpus: 0.5
    depends_on:
      - postgres
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - PORT=3002

  postgres:
    image: postgres:15
    restart: always
    mem_limit: 1g
    cpus: 1
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - pgdata:/var/lib/postgresql/data


volumes:
  pgdata:

`

const dynamic = `
tls:
  certificates:
    - certFile: /certs/selfsigned.crt
      keyFile: /certs/selfsigned.key
`


const traefik = `
entryPoints:
  web:
    address: ":80"
    http:
      redirections:
        entryPoint:
          to: websecure
          scheme: https

  websecure:
    address: ":443"

providers:
  docker: {}
  file:
    filename: /etc/traefik/dynamic.yml
`

try {
    writeFileSync("../docker-compose.yml",docker);
    writeFileSync("../dynamic.yml",dynamic);
    writeFileSync("../traefik.yml",traefik);
} catch (error) {
    console.log(error)
}