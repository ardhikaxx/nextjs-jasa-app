import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBEAyGdO1Xwpw9NmgTZ0_tuNO7d3-Yg4J4",
    authDomain: "jasa-app-53dc7.firebaseapp.com",
    projectId: "jasa-app-53dc7",
    storageBucket: "jasa-app-53dc7.firebasestorage.app",
    messagingSenderId: "457980942373",
    appId: "1:457980942373:web:feb66871017fee410d87cc",
    measurementId: "G-D67YWQEPM7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;