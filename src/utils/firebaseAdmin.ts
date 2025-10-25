import admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
const envPath = path.resolve(process.cwd(), '.env');
dotenv.config({ path: envPath });

// Simple initialization without complex service account object
if (!admin.apps.length) {
    try {
        // Validasi environment variables
        if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
            throw new Error('Missing required Firebase environment variables');
        }

        // Format private key
        const privateKey = process.env.FIREBASE_PRIVATE_KEY
            .replace(/^"|"$/g, '')
            .replace(/\\n/g, '\n');

        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: privateKey
            }),
            databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
        });
        
        console.log('✅ Firebase Admin initialized successfully');
    } catch (error: any) {
        console.error('❌ Firebase Admin initialization error:', error.message);
        throw error;
    }
}

export default admin;