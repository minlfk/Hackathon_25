
# Use an official Python runtime as a parent image
FROM python:3.9-slim as backend

# Set the working directory
WORKDIR /app

# Copy the FastAPI app code
COPY backend/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt
COPY backend /app

# Use an official Node.js runtime as a parent image
FROM node:14 as frontend

# Set the working directory
WORKDIR /app

# Copy the React app code
COPY frontend/package.json /app/
COPY frontend/package-lock.json /app/
RUN npm install
COPY frontend /app
RUN npm run build

# Use a minimal base image to reduce the final image size
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy the backend from the backend stage
COPY --from=backend /app /app

# Copy the frontend build from the frontend stage
COPY --from=frontend /app/build /app/frontend/build

# Install Uvicorn
RUN pip install uvicorn

# Expose the port FastAPI is running on
EXPOSE 8000

# Command to run the FastAPI app with Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
