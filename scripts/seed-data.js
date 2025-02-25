const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin with service account
const serviceAccount = require('../config/serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Test users data
const testUsers = [
    {
        uid: 'test-user-1',
        email: 'john.doe@example.com'
    },
    {
        uid: 'test-user-2',
        email: 'jane.smith@example.com'
    }
];

// Test messages data
const testMessages = [
    {
        text: "Hello everyone! Welcome to our chat app! 👋",
        userId: 'test-user-1',
        userEmail: 'john.doe@example.com',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
    },
    {
        text: "Hi John! Thanks for creating this amazing chat app! 😊",
        userId: 'test-user-2',
        userEmail: 'jane.smith@example.com',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
    },
    {
        text: "You can send messages in real-time! ⚡",
        userId: 'test-user-1',
        userEmail: 'john.doe@example.com',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
    },
    {
        text: "And see when others are typing... ✨",
        userId: 'test-user-2',
        userEmail: 'jane.smith@example.com',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
    },
    {
        text: "The app uses Firebase for authentication and data storage 🔒",
        userId: 'test-user-1',
        userEmail: 'john.doe@example.com',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
    },
    {
        text: "And Socket.IO for real-time communication! 🚀",
        userId: 'test-user-2',
        userEmail: 'jane.smith@example.com',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
    }
];

async function seedData() {
    try {
        // Add test messages
        const batch = db.batch();
        
        testMessages.forEach((message) => {
            const messageRef = db.collection('messages').doc();
            batch.set(messageRef, message);
        });

        await batch.commit();
        console.log('Test data added successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error adding test data:', error);
        process.exit(1);
    }
}

// Run the seeding
seedData();
