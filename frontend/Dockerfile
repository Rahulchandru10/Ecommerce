# Use Node.js as a base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

EXPOSE 3000
# Start the development server (make sure your start script is configured for production)
CMD ["npm", "start"]
