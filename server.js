const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');
const admin = require('firebase-admin');

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

const db = admin.firestore();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('New client connected');

    // Join a room (for private messaging)
    socket.on('join-room', (room) => {
        socket.join(room);
        console.log(`Client joined room: ${room}`);
    });

    // Handle new messages
    socket.on('send-message', async (messageData) => {
        try {
            // Save message to Firestore
            const docRef = await db.collection('messages').add({
                text: messageData.text,
                userId: messageData.userId,
                userEmail: messageData.userEmail,
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            });

            // Broadcast message to all clients
            io.emit('new-message', {
                id: docRef.id,
                ...messageData,
                createdAt: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error saving message:', error);
            socket.emit('error', { message: 'Error saving message' });
        }
    });

    // Handle typing status
    socket.on('typing', (data) => {
        socket.broadcast.emit('user-typing', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
