// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBZbI35OQ6806myazjJJAE6VO2xq_C6XbY',
  authDomain: 'netflixgpt-b4730.firebaseapp.com',
  projectId: 'netflixgpt-b4730',
  storageBucket: 'netflixgpt-b4730.appspot.com',
  messagingSenderId: '280892887371',
  appId: '1:280892887371:web:5239125b342ab47e2ed8ce',
  measurementId: 'G-1THQN258RC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//One time setup of getAuth()
export const auth = getAuth();
