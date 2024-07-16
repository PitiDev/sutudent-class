FROM node:16 AS build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Nuxt.js app
RUN npm run generate

# PRODUCTION STAGE
FROM nginx:stable-alpine

# Copy the built files from the build-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
# COPY nginx/nginx-prod.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]

