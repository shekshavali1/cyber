# AI System to Detect Cyberbullying

An AI-powered web application that detects cyberbullying in real-time using Artificial Intelligence, Natural Language Processing (NLP), TensorFlow.js, and the Google Gemini API. The system analyzes chat messages, identifies harmful content, warns users, generates AI explanations, and automatically blocks repeat offenders to create a safer online communication environment.

## Features

* User Authentication (Login & Signup)
* Real-Time Chat Interface
* AI-Based Cyberbullying Detection
* Hate Speech Detection
* Threat Detection
* Harassment Detection
* Abusive Language Detection
* Spam Detection
* AI Confidence Score
* AI Explanation of Detected Messages
* Voice Warning Alerts
* Language Translation Support
* Automatic User Blocking
* Incident Report Generation
* Dashboard with Detection Statistics
* User Profile Management
* Responsive User Interface

## Technologies Used

* HTML5
* CSS3
* JavaScript
* React.js
* Vite
* Firebase Authentication
* Firebase Firestore
* TensorFlow.js
* Google Gemini API
* Natural Language Processing (NLP)
* Web Speech API
* Git & GitHub

## Project Structure

```text
AI-System-to-Detect-Cyberbullying/
│
├── public/
├── src/
│
├── auth/
│   ├── login.js
│   ├── register.js
│   └── forgot.js
│
├── pages/
│   ├── home.js
│   ├── chat.js
│   ├── profile.js
│   ├── dashboard.js
│   ├── reports.js
│   ├── blockedUsers.js
│   ├── emergency.js
│   └── settings.js
│
├── components/
│   ├── navbar.js
│   ├── sidebar.js
│   ├── chatBox.js
│   ├── messageCard.js
│   ├── warningPopup.js
│   ├── confidenceMeter.js
│   ├── voiceAlert.js
│   └── languageTranslator.js
│
├── ai/
│   ├── gemini.js
│   ├── tensorflow.js
│   ├── keywordDetection.js
│   ├── explainMessage.js
│   ├── confidenceScore.js
│   ├── spamDetection.js
│   └── autoBlock.js
│
├── services/
│   ├── firebase.js
│   ├── authService.js
│   ├── chatService.js
│   ├── reportService.js
│   └── notificationService.js
│
├── utils/
│   ├── helpers.js
│   ├── constants.js
│   ├── validators.js
│   └── speech.js
│
├── router.js
├── main.js
├── style.css
├── .env
├── package.json
├── vite.config.js
└── README.md
```

## Installation

```bash
git clone https://github.com/your-username/AI-System-to-Detect-Cyberbullying.git

cd AI-System-to-Detect-Cyberbullying

npm install

npm run dev
```

## Environment Variables

Create a `.env` file and add your credentials.

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_GEMINI_API_KEY=
```

## System Workflow

```text
User Login
      │
      ▼
Open Chat
      │
      ▼
Receive Message
      │
      ▼
AI Detection Engine
      │
      ▼
Analyze Message
      │
      ▼
Detect:
• Hate Speech
• Threat
• Abuse
• Harassment
• Spam
      │
      ▼
Generate Confidence Score
      │
      ▼
Explain Message
      │
      ▼
Voice Warning (Optional)
      │
      ▼
Count Harmful Messages
      │
      ▼
3 Harmful Messages?
      │
 ┌────┴────┐
 │         │
No        Yes
 │         │
 ▼         ▼
Warn     Auto Block User
              │
              ▼
Save Incident Report
              │
              ▼
Dashboard & Statistics
```

## Future Improvements

* Image-Based Cyberbullying Detection
* Voice Toxicity Detection
* Emotion Analysis
* AI Chatbot Support
* Parent Monitoring Dashboard
* Mobile Application
* Advanced Multilingual Support
* Improved Deep Learning Models

## Project Team

This project was developed as a group project by:

1. **Shaik Sheksha Vali**
2. **Nandini M**
3. **Thanmai P**
4. **Sumanth Reddy P**

## License

This project is developed for educational and research purposes.

⭐ If you found this project useful, consider giving it a star on GitHub!
