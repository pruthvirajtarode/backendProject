FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm ci --only=production

# Bundle app source
COPY . .

# Expose port
EXPOSE 5000

# Create logs directory
RUN mkdir -p logs

# Start the app
CMD ["node", "server.js"]
