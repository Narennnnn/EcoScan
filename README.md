# 🌍 EcoScan - Clothing Carbon Footprint Scanner
Demo Video: https://www.loom.com/share/e9de3364aab244258ff6bcb3c2bb7219?sid=0abd3e56-46b9-4f2e-a6c7-6abf2b48dc06

## 📜 Overview
EcoScan is a mobile app designed to help users understand the environmental impact of their clothing. By uploading images of clothing items, users can see estimated carbon scores, earn eco-reward points, and redeem sustainability-focused offers. The app uses Azure Vision API to analyze clothing items and calculate their environmental impact.

## 🔧 Tech Stack
### Frontend
- React Native with Expo
- TypeScript
- React Navigation (Tab-based navigation)
- Context API (Global state management)
- AsyncStorage (Local data persistence)
- expo-image-picker (Camera & Gallery integration)

### Backend
- Node.js
- Express.js
- Azure Vision API (Image recognition)
- Mocha (Testing)

---

## 🚀 Setup Instructions

1. **Clone the Repositories**  
   ```bash
   # Clone Frontend
   git clone https://github.com/Narennnnn/eco-scan-challenge.git
   cd eco-scan-challenge
   
   # Clone Backend
   git clone https://github.com/Narennnnn/eco-scan-challenge-backend.git
   cd eco-scan-challenge-backend
   ```

2. **Install Dependencies**  
   ```bash
   # Frontend
   cd eco-scan-challenge
   npm install
   
   # Backend
   cd eco-scan-challenge-backend
   npm install
   ```

3. **Run the Applications**
   - **Backend**: 
     ```bash
     npm run dev   # Runs on http://localhost:3000
     ```
   - **Frontend**: 
     ```bash
     npx expo start   # Launches Expo development server
     ```

4. **Development Builds**
   ```bash
   # iOS Simulator
   eas build --profile development --platform ios
   
   # Android Development
   eas build --profile development --platform android
   ```

---

## 📱 Features

### Image Recognition
- Take photos or select from gallery
- Azure Vision API integration for clothing detection
- Real-time analysis feedback

### Carbon Score Calculation
- Estimates environmental impact
- Considers clothing type and characteristics
- Awards eco points based on sustainable choices

### User Features
- Scan history tracking
- Eco points system
- Rewards and offers
- Local data persistence

---

## 🌱 Carbon Score System

The app calculates environmental impact based on:
- Clothing type identification
- Material analysis
- Size and complexity factors

Points are awarded for:
- Choosing sustainable materials
- Reusing clothing items
- Engaging with eco-friendly brands

---

## 🔄 Data Flow
1. User captures/selects image
2. Image sent to backend server
3. Azure Vision API analyzes image
4. Carbon score calculated
5. Results stored in Context API
6. Updates reflected across all screens
7. Data persisted locally using AsyncStorage

---

## 📲 Testing

- Run on iOS Simulator
- Test on Android devices
- Use Expo Go for quick testing
- Development builds for native testing

---

### 🌟 Future Enhancements

1. **AI Improvements**
   - Enhanced material detection
   - More accurate carbon scoring
   - Brand recognition

2. **User Experience**
   - Social sharing features
   - Community challenges
   - Detailed sustainability tips

3. **Technical**
   - Offline support
   - Push notifications
   - Advanced analytics

---

## 🔗 Links
- [Frontend Repository](https://github.com/Narennnnn/eco-scan-challenge)
- [Backend Repository](https://github.com/Narennnnn/eco-scan-challenge-backend)

---

### Thank you for contributing to a sustainable future! 🌍💚
