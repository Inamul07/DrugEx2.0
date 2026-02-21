# DrugEx 2.0

A comprehensive mobile and web-based crime reporting system designed to combat drug trafficking through community engagement. The platform enables citizens to anonymously report suspicious activities while providing law enforcement administrators with tools to track, analyze, and respond to incidents.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

DrugEx 2.0 is a three-tier application consisting of:

1. **Mobile Client App** - React Native application for citizens to report drug-related incidents
2. **Admin Dashboard** - React Native application for law enforcement to view and manage reports
3. **Backend API** - FastAPI server with MongoDB database, featuring AI-powered face recognition and GPS extraction

The system uses advanced computer vision to identify recurring suspects across multiple reports and automatically extracts location data from uploaded images.

## ✨ Features

### Client Application

- 📱 **Anonymous Crime Reporting** - Submit detailed incident reports without revealing identity
- 📸 **Photo Upload** - Capture or upload images as evidence
- 📍 **Location Tracking** - Automatic GPS tagging of incidents
- 💬 **Community Chat** - Engage with support services and community members
- 📅 **Incident Timeline** - Record date and time of incidents
- 🔍 **Detailed Incident Forms** - Comprehensive fields for trafficking type, transport method, suspect description
- ℹ️ **Information Pages** - About us and appreciation screens

### Admin Dashboard

- 📊 **Report Management** - View all submitted reports in a centralized dashboard
- 🔗 **Related Reports** - AI-powered linking of reports based on face recognition
- 🗺️ **Geographic Visualization** - Map view of incident locations
- 🔄 **Real-time Updates** - Pull-to-refresh functionality
- 📈 **Report Statistics** - Track total number of reports

### Backend Services

- 🤖 **Face Recognition** - Automatic face detection and matching using dlib
- 🌍 **GPS Extraction** - Extract location metadata from uploaded images
- 💾 **MongoDB Integration** - Robust NoSQL database for storing reports
- 🔐 **CORS Support** - Cross-origin resource sharing enabled
- 📡 **RESTful API** - Well-structured endpoints for all operations
- 🐳 **Docker Support** - Containerized deployment ready

## 🏗️ Architecture

```
┌─────────────────┐         ┌─────────────────┐
│  Client App     │         │   Admin App     │
│  (React Native) │         │  (React Native) │
└────────┬────────┘         └────────┬────────┘
         │                           │
         │         HTTP/REST         │
         └───────────┬───────────────┘
                     │
              ┌──────▼──────┐
              │   FastAPI   │
              │   Backend   │
              └──────┬──────┘
                     │
         ┌───────────┼───────────┐
         │           │           │
    ┌────▼───┐  ┌───▼────┐  ┌──▼──────┐
    │MongoDB │  │  dlib  │  │Firebase │
    │   DB   │  │Face Rec│  │ Storage │
    └────────┘  └────────┘  └─────────┘
```

## 🛠️ Technology Stack

### Frontend (Client & Admin)

- **Framework**: React Native 0.71.8
- **Navigation**: React Navigation 6.x (Drawer & Stack navigators)
- **State Management**: React Hooks (useState, useEffect)
- **UI Components**: Expo SDK 48
- **Maps**: React Native Maps
- **Chat**: React Native Gifted Chat
- **Storage**: AsyncStorage
- **Image Handling**: Expo Image Picker, Expo Location

### Backend

- **Framework**: FastAPI 0.94.0
- **Language**: Python 3.9
- **Server**: Uvicorn 0.21.0
- **Database**: MongoDB (Motor async driver)
- **Computer Vision**:
    - dlib 19.24.1
    - face-recognition 1.3.0
    - Pillow 9.4.0
- **NLP**: Gensim 4.3.1
- **Scientific Computing**: NumPy 1.24.2, SciPy 1.11.1

### Infrastructure

- **Containerization**: Docker & Docker Compose
- **Database Management**: Mongo Express
- **Cloud Storage**: Firebase Storage
- **Version Control**: Git

## 📁 Project Structure

```
DrugEx2.0/
├── client/                      # React Native Client App
│   └── DrugExClient/
│       ├── App.js              # Main app entry with navigation
│       ├── config.js           # Firebase configuration
│       ├── screens/            # App screens
│       │   ├── HomeScreen.js
│       │   ├── ReportScreen.js
│       │   ├── ChatScreen.js
│       │   ├── AboutUsScreen.js
│       │   └── AppreciationScreen.js
│       ├── components/         # Reusable components
│       │   ├── CustomButton.js
│       │   ├── Modal.js
│       │   └── ProgressDialog.js
│       └── assets/
│           └── color.js        # Color theme
│
├── admin/                       # React Native Admin App
│   └── DrugExAdmin/
│       ├── App.js              # Admin app entry
│       ├── screens/
│       │   ├── ListScreen.js   # View all reports
│       │   └── DetailsScreen.js # Report details
│       └── components/
│           ├── ReportCard.js
│           ├── RelatedReports.js
│           ├── Field.js
│           └── ShortField.js
│
└── backend/                     # FastAPI Backend
    ├── main.py                 # Application entry point
    ├── app.py                  # FastAPI app configuration
    ├── requirements.txt        # Python dependencies
    ├── Dockerfile             # Docker image config
    ├── docker-compose.yaml    # Multi-container setup
    ├── database/
    │   └── db.py              # MongoDB operations
    ├── models/
    │   ├── report.py          # Report data model
    │   ├── chat.py            # Chat message model
    │   └── user.py            # User model
    ├── routes/
    │   ├── report.py          # Report endpoints
    │   ├── chat.py            # Chat endpoints
    │   ├── face.py            # Face recognition endpoints
    │   └── location.py        # GPS extraction endpoints
    └── keys/
        └── keys.py            # API keys & secrets
```

## 📋 Prerequisites

### For Backend

- Python 3.9+
- Docker & Docker Compose (optional but recommended)
- MongoDB 4.4+ (or use Docker Compose)
- CMake (for dlib installation)

### For Client & Admin Apps

- Node.js 14+
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator
- Physical device for testing (recommended)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/DrugEx2.0.git
cd DrugEx2.0
```

### 2. Backend Setup

#### Option A: Using Docker (Recommended)

```bash
cd backend

# Start MongoDB and Mongo Express
docker-compose up -d

# Build and run the backend
docker build -t drugex-backend .
docker run -p 8000:8000 drugex-backend
```

#### Option B: Manual Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python main.py
```

The backend will be available at `http://localhost:8000`

### 3. Client App Setup

```bash
cd client/DrugExClient

# Install dependencies
npm install

# Start the development server
npm start

# Run on specific platform
npm run ios      # iOS
npm run android  # Android
npm run web      # Web
```

### 4. Admin App Setup

```bash
cd admin/DrugExAdmin

# Install dependencies
npm install

# Start the development server
npm start

# Run on specific platform
npm run ios      # iOS
npm run android  # Android
```

## ⚙️ Configuration

### Backend Configuration

1. **Database Connection** (`backend/database/db.py`):

    ```python
    # Update MongoDB connection string
    MONGODB_URL = "mongodb://rootuser:rootpass@localhost:27017"
    ```

2. **API Keys** (`backend/keys/keys.py`):
    ```python
    # Add your API keys
    FIREBASE_API_KEY = "your-firebase-api-key"
    ```

### Client App Configuration

1. **Firebase Setup** (`client/DrugExClient/config.js`):

    ```javascript
    const firebaseConfig = {
    	apiKey: "your-api-key",
    	authDomain: "your-auth-domain",
    	projectId: "your-project-id",
    	storageBucket: "your-storage-bucket",
    	messagingSenderId: "your-sender-id",
    	appId: "your-app-id",
    };
    ```

2. **Backend URL** (`client/DrugExClient/screens/ReportScreen.js`):
    ```javascript
    // Update the backend URL
    const BACKEND_URL = "http://your-backend-url:8000";
    ```

### Admin App Configuration

1. **Backend URL** (`admin/DrugExAdmin/screens/ListScreen.js`):
    ```javascript
    const domain = "http://your-backend-url:8000/";
    ```

## 🏃 Running the Application

### Development Mode

1. **Start MongoDB** (if using Docker):

    ```bash
    cd backend
    docker-compose up -d
    ```

2. **Start Backend**:

    ```bash
    cd backend
    python main.py
    ```

    Backend runs on `http://localhost:8000`

3. **Start Client App**:

    ```bash
    cd client/DrugExClient
    npm start
    ```

4. **Start Admin App**:
    ```bash
    cd admin/DrugExAdmin
    npm start
    ```

### Production Deployment

#### Backend (Using Docker)

```bash
cd backend
docker-compose up -d
docker build -t drugex-backend .
docker run -d -p 8000:8000 --name drugex-api drugex-backend
```

#### Client & Admin Apps

```bash
# Build for production
cd client/DrugExClient
expo build:android  # or expo build:ios

cd admin/DrugExAdmin
expo build:android  # or expo build:ios
```

## 📚 API Documentation

Once the backend is running, visit:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

### Key Endpoints

#### Reports

- `POST /reports/report-crime` - Submit a new crime report
- `GET /reports/get-all-reports` - Fetch all reports
- `GET /reports/get-report?reportId={id}` - Get specific report
- `GET /reports/get-related-reports?reportId={id}` - Get related reports (face-matched)

#### Chat

- `POST /add-chat` - Send a chat message
- `GET /get-messages?userId={id}` - Get user's chat messages

#### Face Recognition

- `GET /faces/get-all-faces` - Get all stored face encodings

#### Location

- `GET /location/get-location?url={imageUrl}` - Extract GPS from image EXIF data

### Request/Response Examples

**Submit Crime Report**:

```json
POST /reports/report-crime
{
  "report_id": "abc123",
  "incident_description": "Suspicious activity observed",
  "incident_date": "2026-02-20",
  "city": "New York",
  "address": "123 Main St",
  "gender": "Male",
  "appearance": "Tall, dark clothing",
  "trafficking_type": "Street dealing",
  "transport_method": "Motorcycle",
  "approx_age": "25-30",
  "other_info": "Additional details",
  "images": ["https://firebase.url/image.jpg"],
  "location": [40.7128, -74.0060]
}
```

## 🧪 Testing

### Backend Tests

```bash
cd backend
pytest tests/
```

### Mobile App Testing

- Use Expo Go app for quick testing
- Test on physical devices for location and camera features
- Use iOS Simulator/Android Emulator for UI testing

## 🤝 Contributing

We welcome contributions to DrugEx 2.0! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- **Python**: Follow PEP 8 guidelines
- **JavaScript**: Use ESLint with Airbnb style guide
- **Commits**: Use conventional commits format

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Mohammad Inamul Hassan M** - Initial work

## 🙏 Acknowledgments

- Face recognition powered by [dlib](http://dlib.net/)
- Mobile framework by [Expo](https://expo.dev/)
- Backend framework by [FastAPI](https://fastapi.tiangolo.com/)
- Database by [MongoDB](https://www.mongodb.com/)

## 📈 Roadmap

- [ ] User authentication and authorization
- [ ] Email notifications for admins
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Encryption for sensitive data
- [ ] Report verification system
- [ ] Machine learning for pattern detection
- [ ] Integration with law enforcement databases
- [ ] iOS & Android app store deployment

---

**Note**: This application is designed to support law enforcement and community safety. All reports should be handled with appropriate confidentiality and in accordance with local laws and regulations.
