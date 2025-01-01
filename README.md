# Plant Leaf Disease Classification

## Overview
This project uses a deep learning model to classify 13 diseases in tomato and potato plants. It includes a trained CNN model, a backend API for handling requests, and a frontend web interface for image uploads and disease prediction.

## Features
- **Supported Classifications**:
  - Potato: Early Blight, Late Blight, Healthy
  - Tomato: Bacterial Spot, Early Blight, Late Blight, Leaf Mold, Septoria Leaf Spot, Spider Mites, Target Spot, Yellow Leaf Curl Virus, Mosaic Virus, Healthy
- **Technology**:
  - Model: The model is based on MobileNetV2 that has been fine-tuned for plant disease classification.
  - Backend: FastAPI is used to serve the model for prediction in a RESTful architecture.
  - Frontend: A React.js application with Material-UI provides an intuitive interface for image uploads and result display.

## Directory Structure
```plaintext
project-directory/
|
|-- api/                      # Backend API
|   |-- main.py               # FastAPI backend
|   |-- requirements.txt      # Backend dependencies
|
|-- frontend/                 # Frontend application
|   |-- src/                  # Frontend source files
|       |-- App.jsx           # Main React component
|       |-- home.jsx          # Component for image uploads
|       |-- index.css         # Global stylesheet (if used)
|   |-- vite.config.js        # Vite configuration
|
|-- saved_models/             # Trained models
|   |-- model_v1.h5           # Trained TensorFlow model
|
|-- plant_disease_model.ipynb # Jupyter notebook for model training
```

## System Requirements
**Backend**
- Python 3.8+
- Required Libraries:
  - Tensorflow==2.16.1
  - FastAPI
  - Uvicorn
  - Numpy
  - Pillow
  - Python-multipart
  
**Frontend**
  - Node.js 16+
  - React.js
  - Material-UI

## Setup Instructions
**Backend**
1. Navigate to the api/ directory:
    ```
    cd api
    ```
2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Start the API server:
   ```
   uvicorn main:app --reload
   ```

**Frontend**
1. Navigate to the frontend/ directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
 






