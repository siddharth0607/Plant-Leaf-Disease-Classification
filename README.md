# Plant Leaf Disease Classification

## Overview
This project uses a deep learning model to classify 13 diseases in tomato and potato plants. It provides real-time predictions from user-uploaded images through a modern full-stack interface.

## Features
- **Supported Classifications**:
  - Potato: Early Blight, Late Blight, Healthy
  - Tomato: Bacterial Spot, Early Blight, Late Blight, Leaf Mold, Septoria Leaf Spot, Spider Mites, Target Spot, Yellow Leaf Curl Virus, Mosaic Virus, Healthy
- **Technology**:
  - Model: Fine-tuned MobileNetV2 convolutional neural network for plant disease detection.
  - Backend: FastAPI providing a RESTful API to serve model predictions.
  - Frontend: React.js application styled with Material-UI for seamless image upload and result visualization.
  - Deployment: Full-stack app deployed on AWS EC2 with Nginx and PM2.

 ## Demo
 **Live Website**: http://13.200.249.102<br>
 Upload a leaf image and get instant disease predictions.

## Project Structure
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
|-- ecosystem.config.js       # PM2 process manager config
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
**Backend Setup (FastAPI)**
1. Create a virtual environment:
   ```
   python3 -m venv venv
   ```
2. Activate the virtual environment:
   ```
   # On Windows
   .\venv\Scripts\activate

   # On Linux/macOS
   source venv/bin/activate
   ```
3. Navigate to the api directory:
    ```
    cd api
    ```
4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
5. Start the API server:
   ```
   uvicorn main:app --reload
   ```

**Frontend Setup (React + Vite)**
1. Navigate to the frontend directory:
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

**Deployment (Production)**
- Frontend is built with:
  ```
  npm run build
  ```
- Served via Nginx on `/var/www/html/`
- Backend API is managed with PM2:
  ```
  pm2 start ecosystem.config.js
  ```


## Future Enhancements
- Add support for more crop types and diseases
- Implement user authentication for saved results

## Contributions
Contributions, suggestions and feedback are always welcome! Feel free to open an issue or submit a pull request.
