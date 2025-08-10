# Base image
FROM node:23

# App directory
WORKDIR /app

# Copy package
COPY package*.json ./

# Install dependency
RUN npm install

# Copy files of application
COPY . .

# 🏗️ Build step (TypeScript)
RUN npm run build

# Open port
EXPOSE 3002

# Prisma generate
RUN npx prisma generate

# Start app
CMD ["npm", "start"]