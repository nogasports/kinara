import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCTNoquKKIuynUHJyH9yuVzpNsdIFJCY2s",
  authDomain: "kinaraenergy.firebaseapp.com",
  projectId: "kinaraenergy",
  storageBucket: "kinaraenergy.firebasestorage.app",
  messagingSenderId: "929653602225",
  appId: "1:929653602225:web:22eab81579ea87ed3daf90",
  measurementId: "G-8KP59Z84F7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, analytics };