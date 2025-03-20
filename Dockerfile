# Stage 1: Build React app
FROM node:16 as build

WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

ENV VITE_BASE_URL=/api

COPY frontend/ ./
RUN npm run build

# Stage 2: Set up Nginx and FastAPI
FROM python:3.12

# Install Nginx
RUN apt-get update && apt-get install -y nginx git

# Set up the working directory
WORKDIR /app

# Copy the FastAPI backend
COPY backend/ /app/backend

# Accept GitHub token as a build argument
ARG GITHUB_TOKEN

# Change to the backend directory where requirements.txt is located
WORKDIR /app/backend

# Modify the requirements.txt with the GitHub token
RUN sed -i "s|git+https://github|git+https://$GITHUB_TOKEN@github|" requirements.txt

# Install Python dependencies
RUN pip install -r requirements.txt

# Set up the working directory
WORKDIR /app

# Copy the React build from the previous stage
COPY --from=build /app/frontend/dist /var/www/html

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80 8000

# Start Nginx and FastAPI
CMD nginx -g 'daemon off;' & uvicorn backend.main:app --host 0.0.0.0 --port 8000