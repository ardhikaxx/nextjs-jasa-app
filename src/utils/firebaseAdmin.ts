import admin from 'firebase-admin';
import path from 'path';

if (!admin.apps.length) {
    try {
        const serviceAccountPath = path.resolve(process.cwd(), 'serviceAccountKey.json');
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccountPath),
        });
        console.log('✅ Firebase Admin initialized from service account file');
    } catch (error) {
        console.error('❌ Firebase Admin initialization error:', error);
        throw error;
    }
}

export default admin;
