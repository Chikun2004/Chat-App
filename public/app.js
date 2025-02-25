// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { firebaseConfig } from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Socket.IO
const socket = io();

let currentUser = null;
let typingTimeout = null;

// Auth State Listener
onAuthStateChanged(auth, user => {
    if (user) {
        currentUser = user;
        document.getElementById('auth-container').classList.add('hidden');
        document.getElementById('chat-container').classList.remove('hidden');
        loadMessages();
    } else {
        currentUser = null;
        document.getElementById('auth-container').classList.remove('hidden');
        document.getElementById('chat-container').classList.add('hidden');
    }
});

async function login() {
    try {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        alert(`Login Error: ${error.message}`);
    }
}

async function signup() {
    try {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        alert(`Signup Error: ${error.message}`);
    }
}

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    
    if (message && currentUser) {
        const messageData = {
            text: message,
            userId: currentUser.uid,
            userEmail: currentUser.email,
            timestamp: new Date()
        };

        // Emit message through Socket.IO
        socket.emit('send-message', messageData);
        messageInput.value = '';
    }
}

function loadMessages() {
    const messagesQuery = query(
        collection(db, 'messages'),
        orderBy('createdAt', 'asc')
    );

    onSnapshot(messagesQuery, (snapshot) => {
        const messages = [];
        snapshot.forEach((doc) => {
            messages.push({ id: doc.id, ...doc.data() });
        });
        displayMessages(messages);
    });
}

function displayMessages(messages) {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${message.userEmail}: ${message.text}`;
        messageElement.className = message.userId === currentUser?.uid ? 'sent' : 'received';
        messagesDiv.appendChild(messageElement);
    });
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Socket.IO event listeners
socket.on('new-message', (message) => {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${message.userEmail}: ${message.text}`;
    messageElement.className = message.userId === currentUser?.uid ? 'sent' : 'received';
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

socket.on('user-typing', (data) => {
    // Add typing indicator
    const typingIndicator = document.getElementById('typing-indicator') || document.createElement('div');
    typingIndicator.id = 'typing-indicator';
    typingIndicator.textContent = `${data.userEmail} is typing...`;
    document.getElementById('messages').appendChild(typingIndicator);
    
    // Remove typing indicator after 2 seconds
    setTimeout(() => {
        typingIndicator.remove();
    }, 2000);
});

// Handle typing events
document.getElementById('message-input').addEventListener('input', () => {
    if (currentUser) {
        clearTimeout(typingTimeout);
        socket.emit('typing', { userEmail: currentUser.email });
        
        typingTimeout = setTimeout(() => {
            socket.emit('typing-stopped', { userEmail: currentUser.email });
        }, 1000);
    }
});

// Expose functions to window for onclick handlers
window.login = login;
window.signup = signup;
window.sendMessage = sendMessage;