# API Documentation

## Socket.IO Events

### Client to Server Events

#### 1. send-message
Sends a new message to the server.

```javascript
socket.emit('send-message', {
    text: string,      // Message content
    userId: string,    // Sender's user ID
    userEmail: string  // Sender's email
});
```

#### 2. typing
Indicates that a user is typing.

```javascript
socket.emit('typing', {
    userEmail: string  // Email of user who is typing
});
```

#### 3. typing-stopped
Indicates that a user has stopped typing.

```javascript
socket.emit('typing-stopped', {
    userEmail: string  // Email of user who stopped typing
});
```

### Server to Client Events

#### 1. new-message
Broadcasts a new message to all connected clients.

```javascript
socket.on('new-message', (message) => {
    // message: {
    //     id: string,        // Message ID
    //     text: string,      // Message content
    //     userId: string,    // Sender's user ID
    //     userEmail: string, // Sender's email
    //     createdAt: string  // ISO timestamp
    // }
});
```

#### 2. user-typing
Broadcasts typing status to all other clients.

```javascript
socket.on('user-typing', (data) => {
    // data: {
    //     userEmail: string  // Email of user who is typing
    // }
});
```

#### 3. error
Sends error information to the client.

```javascript
socket.on('error', (error) => {
    // error: {
    //     message: string    // Error message
    // }
});
```

## Firebase Authentication

### Sign Up
```javascript
async function signup(email, password) {
    await createUserWithEmailAndPassword(auth, email, password);
}
```

### Login
```javascript
async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
}
```

## Firestore Database

### Message Collection Schema

```javascript
{
    messages: {
        messageId: {
            text: string,      // Message content
            userId: string,    // Sender's user ID
            userEmail: string, // Sender's email
            createdAt: timestamp // Server timestamp
        }
    }
}
```

### Security Rules

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

## HTTP Endpoints

### GET /
Serves the main application HTML file.

**Response:**
- Status: 200 OK
- Content-Type: text/html
- Body: index.html file

### Static Files
Serves static files from the 'public' directory.

**Base Path:** /
- /app.js
- /firebase-config.js
- /socket.io/socket.io.js

## Error Codes

### Socket.IO Errors
- `connection_error`: Socket connection failed
- `auth_error`: Authentication error
- `message_error`: Message sending failed

### HTTP Status Codes
- 200: Success
- 404: Not Found
- 500: Internal Server Error

## Rate Limiting

Currently implemented rate limits:
- Message sending: No explicit limit
- Typing events: Debounced (1 second)

## Authentication Flow

1. User enters email and password
2. Firebase Authentication validates credentials
3. On success:
   - User receives authentication token
   - Socket connection established
   - Chat interface displayed
4. On failure:
   - Error message displayed
   - User remains on login screen

## Message Flow

1. User sends message:
   ```javascript
   socket.emit('send-message', messageData);
   ```

2. Server processes message:
   - Saves to Firestore
   - Broadcasts to all clients

3. Clients receive message:
   ```javascript
   socket.on('new-message', message => {
       // Update UI
   });
   ```

## Testing

### Test Data Script
```bash
npm run seed
```

This will populate the database with sample messages for testing.
