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
EXPOSE 3000
EXPOSE 3001
EXPOSE 3002
EXPOSE 3003
EXPOSE 5173


# Start app
CMD ["npm", "start"]
