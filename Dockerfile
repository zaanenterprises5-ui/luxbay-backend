# Use official Node.js 14 as base image
FROM node:16.20.2-buster-slim

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server code
COPY . .

# Set the default runtime environment and expose the default port
ENV PORT=5002
ENV HOST=0.0.0.0
EXPOSE 5002

# Default command to start the application
CMD ["node", "index.js"]
