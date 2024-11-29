# EcoScan - Clothing Carbon Footprint Scanner

## Overview
EcoScan is a mobile app designed to help users understand the environmental impact of their clothing. By uploading images of clothing items, users can see estimated carbon scores, earn eco-reward points, and redeem sustainability-focused offers. The app uses Azure Vision API to analyze clothing items and calculate their environmental impact.
## Demo
   https://www.loom.com/share/e9de3364aab244258ff6bcb3c2bb7219?sid=5b957704-896b-4299-8adb-ae406446d9f8
## Tech Stack
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
- Azure AI Services API (Image recognition)
- Mocha (Testing)

---

##  Setup Instructions

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
   
3. **Configure IP Address for Mobile Testing**
   ```bash
   # Find your PC's IP address
   # On Mac/Linux:
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # On Windows:
   ipconfig
   ```

   Then update `services/scanService.ts`:
   ```typescript
   const getApiUrl = () => {
     if (Platform.OS === 'android' || Platform.OS === 'ios') {
       // Replace with your PC's IP address
       return 'http://YOUR_PC_IP:3000/api';  // Example: http://192.168.1.2:3000/api
     }
     return 'http://localhost:3000/api';
   };
   ```

   Important Notes:
   - Your PC and phone must be on the same WiFi network
   - Use your PC's actual IP address (not localhost) for testing on physical devices
   - localhost will work for iOS simulator as it runs on your Mac
   - For Android/ios devices, you must use your PC's IP address


4. **Run the Applications**
   - **Backend**: 
     ```bash
     npm start   # Runs on http://localhost:3000
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

##  Features

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

##  Carbon Score System

The app calculates environmental impact based on:
- Clothing type identification
- Material analysis
- Size and complexity factors


---

##  Data Flow
1. User captures/selects image
2. Image sent to backend server
3. Azure Vision API analyzes image
4. Carbon score calculated
5. Results stored in Context API
6. Updates reflected across all screens
7. Data persisted locally using AsyncStorage

---

## Testing

- Run on iOS Simulator
- Test on Android devices
- Use Expo Go for quick testing
- Development builds for native testing

---

###  Future Enhancements

1. **Map Integration**
   - Integration with map to show nearby sustainable brands
   - Integration with map to show nearby recycling centers
   - Integration with map to show nearby clothing donation centers

2. **User Experience**
   - UI/UX could be improved
   - Social sharing features
   - Detailed sustainability tipsal

3. **Technical**
   - Offline support
   - Push notifications
   - Advanced analytics

4. **Deployment**
   - Publish the app to App Store and Google Play
   - Deploy backend server on Azure App Service

---

##  Links
- [Frontend Repository](https://github.com/Narennnnn/eco-scan-challenge)
- [Backend Repository](https://github.com/Narennnnn/eco-scan-challenge-backend)

---

### Go Green, Save the Planet! 🌍💚

