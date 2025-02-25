# Backend Documentation

## Overview
The backend of the Chat Application is built using Node.js with Express.js framework, integrated with Firebase Admin SDK for secure database operations and Socket.IO for real-time communication.

## Architecture

### Server Setup
```javascript
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
```

## Components

### 1. Express Server (server.js)
- Handles HTTP requests
- Serves static files
- Manages API endpoints
- Integrates Socket.IO

### 2. Firebase Admin (server.js)
```javascript
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.applicationDefault()
});
```
- Manages secure database operations
- Handles server-side authentication
- Provides admin-level access to Firebase services

### 3. Socket.IO Integration
```javascript
io.on('connection', (socket) => {
    // Handle real-time events
});
```

## API Endpoints

### Static Files
```javascript
app.use(express.static('public'));
```
- Serves frontend files from 'public' directory

### Main Route
```javascript
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
```

## Socket.IO Events

### Connection Management
```javascript
io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
```

### Message Handling
```javascript
socket.on('send-message', async (messageData) => {
    // Save to Firestore
    // Broadcast to other clients
});
```

### Typing Indicators
```javascript
socket.on('typing', (data) => {
    socket.broadcast.emit('user-typing', data);
});
```

## Database Operations

### Message Storage
```javascript
const docRef = await db.collection('messages').add({
    text: messageData.text,
    userId: messageData.userId,
    userEmail: messageData.userEmail,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
});
```

## Security

### Firebase Rules (firestore.rules)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /messages/{messageId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null 
        && request.resource.data.userId == request.auth.uid
        && request.resource.data.userEmail == request.auth.token.email;
    }
  }
}
```

### CORS Configuration
```javascript
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"]
}));
```

## Error Handling

### Global Error Handler
```javascript
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
```

### Socket Error Handling
```javascript
socket.on('error', (error) => {
    console.error('Socket error:', error);
    socket.emit('error', { message: 'Internal server error' });
});
```

## Environment Configuration

### Required Environment Variables (.env)
```
PORT=3000
GOOGLE_APPLICATION_CREDENTIALS=./config/serviceAccountKey.json
```

## Test Data

### Seed Script (scripts/seed-data.js)
- Adds test messages to Firestore
- Creates sample conversations
- Run using: `npm run seed`

## Performance Considerations

1. **Message Broadcasting**
   - Uses Socket.IO rooms for efficient message distribution
   - Implements typing indicator debouncing

2. **Database Operations**
   - Uses Firestore batch operations for bulk updates
   - Implements proper indexing for queries

3. **Error Recovery**
   - Implements reconnection logic
   - Handles various error scenarios

## Deployment

### Prerequisites
1. Node.js installed
2. Firebase project setup
3. Service account key
4. Environment variables configured

### Steps
1. Install dependencies: `npm install`
2. Set up environment variables
3. Start server: `npm start`

## Monitoring

### Logging
- Console logging for development
- Error tracking
- Connection status
- Message delivery status

### Performance Metrics
- Connection count
- Message delivery time
- Database operation latency

## Future Enhancements

1. **Scalability**
   - Load balancing
   - Message queuing
   - Caching layer

2. **Features**
   - File uploads
   - User presence
   - Message persistence
   - Group chat support
