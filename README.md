[README (1).md](https://github.com/user-attachments/files/24482374/README.1.md)
# JALRAKSHAK 🌊💧

**Smart Community Health Monitoring and Early Warning System for Water-Borne Diseases**

[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-active-success.svg)]()

## 📋 Overview

Rural communities face significant challenges with waterborne diseases due to limited access to clean water and inadequate health monitoring infrastructure. JALRAKSHAK addresses this critical issue through real-time water quality monitoring, ML-powered disease outbreak prediction, and community education.

## 🎯 Solution

JALRAKSHAK is an integrated platform that combines:
- **IoT-based Water Quality Monitoring** with low-cost sensors
- **Machine Learning Models** for disease outbreak prediction (86.3% confidence)
- **Multilingual Interface** (English, Hindi, Assamese, Bengali)
- **Offline-First Architecture** for remote areas with limited connectivity
- **Community Outreach** through educational resources and AI chatbot assistance

## 🚀 Key Features

### 1. Real-Time Water Quality Monitoring
- pH Level, Turbidity, TDS, Temperature detection
- UV and RGB color analysis for bacterial contamination
- ESP32-based IoT sensor network
- Cloud data synchronization

### 2. Disease Outbreak Prediction
- ML models trained on water quality parameters
- Risk assessment: Low/Medium/High
- Geographic mapping of affected regions
- Monthly disease trend analysis

### 3. User-Friendly Interface
- Simple data submission portal
- Interactive disease risk dashboard
- Real-time outbreak alerts via push notifications
- Mobile-responsive design

### 4. AI Assistant
- Chatbot for waterborne disease education
- Answers queries about cholera, typhoid, dysentery prevention
- Multilingual support for rural health workers

### 5. Offline Capability
- Sync data when connectivity is available
- Works in remote areas with intermittent internet

## 🛠️ Tech Stack

### Frontend
- **React.js** - User interface
- **Tailwind CSS** - Styling
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - Server logic and API
- **Python** - ML model integration and data processing
- **FastAPI** - ML model serving

### Machine Learning
- **Scikit-Learn / TensorFlow** - Disease prediction models
- **Random Forest Algorithm** - Primary prediction model
- **Hugging Face** - Model and API hosting

### Hardware (IoT Sensors)
- **ESP32 Microcontroller**
- pH Sensor (₹800)
- TDS Sensor (₹300)
- Turbidity Meter (₹420)
- DS18B20 Temperature Sensor (₹160)
- UV Sensor CJMCU-34725 (₹180)
- RGB Color Module GUVA-S12SD (₹180)
- 128x64 OLED Display
- **Total Cost: ~₹2,500**

### Cloud & Storage
- Cloud database for water quality data
- Real-time analytics and visualization
- Kaggle datasets for model training

### Additional Services
- **Push Notification Services** - Outbreak alerts
- **Groq API** - AI chatbot integration
- **SendGrid API** - Email notifications

## 📊 System Architecture

```
[IoT Sensors] → [ESP32] → [Cloud Database] → [ML Models on Hugging Face]
                                    ↓
                            [Node.js Backend]
                                    ↓
                            [React Frontend] → [User Interface]
```

### Workflow
1. **Data Collection**: IoT sensors detect water quality parameters
2. **Data Transmission**: ESP32 sends data to cloud via WiFi
3. **ML Prediction**: Models analyze data and predict outbreak risks
4. **Alert System**: Push notifications sent to health workers
5. **Community Access**: Users view results through web/mobile interface

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16+)
- Python (3.8+)
- MongoDB or cloud database access
- ESP32 development environment (for hardware)

### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/heckkkerrr/_JALRAKSHAK.git
cd _JALRAKSHAK

# Install dependencies
npm install

# Start development server
npm start
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Install Node.js dependencies
npm install

# Set environment variables
cp .env.example .env
# Add your API keys and database credentials

# Start the server
npm run dev
```

### ML Models (Hosted on Hugging Face)
Our trained models and APIs are deployed on Hugging Face for scalability and accessibility.

```python
# Example: Using the prediction API
import requests

API_URL = "https://huggingface.co/YOUR_MODEL_ENDPOINT"
headers = {"Authorization": "Bearer YOUR_HF_TOKEN"}

def predict_outbreak(water_data):
    response = requests.post(API_URL, headers=headers, json=water_data)
    return response.json()
```

### Hardware Setup
1. Connect sensors to ESP32 according to circuit diagram
2. Flash ESP32 with sensor reading code
3. Configure WiFi credentials for cloud connectivity
4. Deploy in field locations near water sources

## 🌐 API Endpoints

### Water Quality Data Submission
```
POST /api/submit-data
Body: {
  "ph": 6.8,
  "turbidity": 12.3,
  "tds": 150,
  "temperature": 25,
  "location": "coordinates",
  "waterSource": "Groundwater"
}
```

### Disease Prediction
```
GET /api/predict-outbreak
Query: ?region=northeast&date=2026-01-08
Response: {
  "risk": "Low",
  "confidence": 86.3,
  "model": "Typhoid_best_outbreak_pipeline_4_features"
}
```

### AI Chatbot
```
POST /api/chatbot
Body: {
  "query": "What causes cholera?",
  "language": "en"
}
```

## 📈 Impact & Benefits

### Social Impact
- Improved public health in underserved rural communities
- Reduced waterborne disease incidents
- Empowered local health workers with data-driven insights

### Economic Impact
- Lower healthcare costs from disease prevention
- Reduced economic losses from illness-related productivity drops
- Affordable solution (~₹2,500 per monitoring station)

### Environmental Impact
- Protection of local water ecosystems
- Responsible water management practices
- Prevention of contamination spread

## 🎓 Demo & Documentation

- **Live Demo**: [Add deployment link]
- **Video Presentation**: [https://www.youtube.com/watch?v=iQDEIuXXCAM](https://www.youtube.com/watch?v=iQDEIuXXCAM)
- **Documentation**: Available in docs folder

## 📚 Research & References

- WHO - Water, Sanitation and Hygiene
- NCBI - Waterborne Disease Studies
- Government of India - Jal Shakti Ministry
- UNICEF India - WASH Programs
- IEEE - IoT and Environmental Monitoring
- BIS India - Water Quality Standards

## 👥 Contributors

Developed with ❤️ for rural communities

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

For questions or collaboration opportunities, feel free to reach out.

---

**Empowering Communities Through Technology | Water Quality Monitoring & Disease Prevention**
