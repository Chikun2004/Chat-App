# Real-Time Chat Application

A modern real-time chat application built with Node.js, Express, Socket.IO, and Firebase.

## Features

- **Real-time Messaging**: Instant message delivery using Socket.IO
- **User Authentication**: Secure login and signup using Firebase Authentication
- **Message History**: Persistent message storage using Firebase Firestore
- **Typing Indicators**: Real-time typing status updates
- **Responsive Design**: Works on both desktop and mobile devices

## Documentation

Detailed documentation is available in the `docs` folder:
- [Frontend Documentation](docs/frontend.md) - Detailed guide for the client-side implementation
- [Backend Documentation](docs/backend.md) - Complete server-side implementation details
- [API Documentation](docs/api.md) - API endpoints, events, and data schemas

## Technologies Used

- **Frontend**:
  - HTML5
  - JavaScript (ES6+)
  - Firebase SDK
  - Socket.IO Client

- **Backend**:
  - Node.js
  - Express.js
  - Socket.IO
  - Firebase Admin SDK

- **Database & Authentication**:
  - Firebase Firestore
  - Firebase Authentication

## Project Structure

```
chat-app/
├── config/
│   └── serviceAccountKey.json
├── docs/
│   ├── frontend.md
│   ├── backend.md
│   └── api.md
├── public/
│   ├── app.js
│   ├── index.html
│   └── firebase-config.js
├── scripts/
│   └── seed-data.js
├── .env
├── server.js
├── package.json
└── README.md
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chat-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project
   - Add your Firebase configuration to `public/firebase-config.js`
   - Generate a service account key and save it as `config/serviceAccountKey.json`

4. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Update the variables as needed

5. **Run the application**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

6. **Add test data (optional)**
   ```bash
   node scripts/seed-data.js
   ```

## Features Implemented

1. **Authentication**
   - User signup with email and password
   - User login with email and password
   - Secure authentication state management

2. **Real-time Chat**
   - Instant message delivery
   - Message persistence
   - Typing indicators
   - Read receipts

3. **Security**
   - Firebase Authentication
   - Firestore security rules
   - Protected API endpoints

## Future Enhancements

- File sharing
- User profiles
- Group chat
- Message reactions
- Online/offline status

## Author

Aditya Pal

## License

This project is licensed under the MIT License - see the LICENSE file for details
