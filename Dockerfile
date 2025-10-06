FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .
# Expose app port
EXPOSE 8080

# Start the app
CMD ["node", "server.js"]
