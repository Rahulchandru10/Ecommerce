# Use Node.js as base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Start the backend server
CMD ["node", "server.cjs"]
