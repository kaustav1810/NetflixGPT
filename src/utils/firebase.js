// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey:
		'AIzaSyD-txXGck4jlfBGjQk5weM5oI0CPn2O180',
	authDomain: 'netflixgpt-cae04.firebaseapp.com',
	projectId: 'netflixgpt-cae04',
	storageBucket:
		'netflixgpt-cae04.firebasestorage.app',
	messagingSenderId: '840082087670',
	appId:
		'1:840082087670:web:631c22a849446ef0f0d6d7',
	measurementId: 'G-GC194V2V20',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();

console.log(analytics)