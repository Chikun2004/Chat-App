# Frontend Documentation

## Overview
The frontend of the Chat Application is built using vanilla JavaScript with Firebase SDK for authentication and Socket.IO for real-time communication.

## File Structure
```
public/
├── index.html      # Main HTML file
├── app.js         # Main JavaScript application logic
└── firebase-config.js  # Firebase configuration
```

## Components

### 1. Authentication (app.js)
```javascript
// Authentication Functions
async function login() {
    // Handles user login via Firebase Auth
}

async function signup() {
    // Handles user registration via Firebase Auth
}

// Auth State Observer
onAuthStateChanged(auth, user => {
    // Manages authentication state changes
})
```

### 2. Real-time Messaging (app.js)
```javascript
// Message Functions
function sendMessage() {
    // Sends messages via Socket.IO
}

function loadMessages() {
    // Loads message history from Firestore
}

function displayMessages(messages) {
    // Renders messages in the UI
}
```

### 3. Real-time Events
```javascript
// Socket.IO Event Listeners
socket.on('new-message', (message) => {
    // Handles incoming messages
})

socket.on('user-typing', (data) => {
    // Shows typing indicators
})
```

## UI Components

### 1. Authentication Container
- Email input
- Password input
- Login button
- Sign up button

### 2. Chat Container
- Messages display area
- Message input field
- Send button
- Typing indicator

## Event Handlers

### Message Input
```javascript
document.getElementById('message-input').addEventListener('input', () => {
    // Handles typing events
    // Emits typing status to other users
})
```

### Send Message
```javascript
// Triggered by button click or Enter key
function sendMessage() {
    // Validates message
    // Emits message via Socket.IO
    // Clears input field
}
```

## Firebase Integration

### Authentication
- Uses Firebase Authentication for user management
- Supports email/password authentication
- Maintains user session state

### Firestore
- Stores message history
- Real-time updates via onSnapshot
- Message format:
  ```javascript
  {
    text: string,
    userId: string,
    userEmail: string,
    createdAt: timestamp
  }
  ```

## Socket.IO Events

### Emitted Events
- `send-message`: Sends new message
- `typing`: Indicates user is typing
- `typing-stopped`: Indicates user stopped typing

### Received Events
- `new-message`: New message received
- `user-typing`: Another user is typing
- `error`: Error from server

## Error Handling
```javascript
try {
    // Operation (login, signup, send message)
} catch (error) {
    alert(`Error: ${error.message}`);
}
```

## UI State Management
- Uses CSS classes for showing/hiding components
- Manages authentication state via Firebase
- Updates UI in real-time based on Socket.IO events

## Best Practices
1. Input Validation
2. Error Handling
3. Real-time Updates
4. User Feedback
5. Clean Event Handling
