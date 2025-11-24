# Base image
FROM node:24

# App directory
WORKDIR /app

# Copy package
COPY  backend/pages/package*.json ./

# Install dependency
RUN npm install

# Copy files of application
COPY backend/pages .

COPY frontend ./frontend

# Install frontend dependencies
RUN cd frontend/dashboard && npm install

# Build frontend (Vite)
RUN cd frontend/dashboard && npm run build

# Build js from ts
RUN cd frontend/pages && npm install && npx tsc

# Copy html from src to dist
RUN cd frontend/pages && cp ./src/*.html ./dist 

# Make CSS
RUN cd frontend/pages && npx @tailwindcss/cli -i ./src/index.css -o ./dist/output.css

# Build step (TypeScript)
RUN npm run build

# Open port
EXPOSE 3003

#Prisma
RUN npx prisma generate

# Start app
CMD ["npm", "start"]