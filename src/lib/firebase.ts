// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: 'netflixgpt-cae04.firebaseapp.com',
	projectId: 'netflixgpt-cae04',
	storageBucket: 'netflixgpt-cae04.firebasestorage.app',
	messagingSenderId: '840082087670',
	appId: '1:840082087670:web:631c22a849446ef0f0d6d7',
	measurementId: 'G-GC194V2V20',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth();