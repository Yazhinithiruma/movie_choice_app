# Use the official Node.js image from Docker Hub
FROM node:16

# Set the working directory in the container
WORKDIR /app

# ✅ Set npm cache to a writable directory (important for OpenShift)
ENV npm_config_cache=/tmp/.npm

# ✅ Create the cache directory and ensure it's writable
RUN mkdir -p /tmp/.npm && chmod -R 777 /tmp/.npm

# Copy the package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install the dependencies defined in package.json
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
