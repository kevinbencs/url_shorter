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

# Prisma generate
RUN npx prisma generate

# Start app
CMD ["npm", "start"]
