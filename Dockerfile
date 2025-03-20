# Stage 1: Build React app
FROM node:20 AS build

WORKDIR /app/hack25

COPY hack25/package.json hack25/package-lock.json ./
RUN npm install

ENV VITE_BASE_URL=/api

COPY hack25/ ./
RUN npm run build

# Stage 2: Set up Nginx and FastAPI
FROM python:3.12

# Install Nginx
RUN apt-get update && apt-get install -y nginx git

# Set up the working directory
WORKDIR /app

# Copy the FastAPI backend
COPY backend/ /app/backend

# Change to the backend directory where requirements.txt is located
WORKDIR /app/backend

# Install Python dependencies
RUN pip install -r requirements.txt

# Set up the working directory
WORKDIR /app/backend

# Copy the React build from the previous stage
COPY --from=build /app/hack25/dist /var/www/html

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80 8000

# Start Nginx and FastAPI
CMD nginx -g 'daemon off;' & uvicorn app:app --host 0.0.0.0 --port 8000
