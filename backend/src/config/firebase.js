const admin = require('firebase-admin');

// Service account should be securely stored or passed through env vars
let serviceAccount;

try {
    // Option 1: Provide full path to JSON file
    // serviceAccount = require('../../path/to/serviceAccountKey.json');

    // Option 2: Pass as JSON string via environment variable
    const privateKey = process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : '';

    serviceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
    };

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    console.log('Firebase Admin Initialized successfully.');
} catch (error) {
    console.error('Firebase Admin Initialization Error:', error.message);
    // Continue without complete crash, just log warning
}

module.exports = admin;
