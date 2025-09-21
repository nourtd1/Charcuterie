import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  "projectId": "julies-gourmet-goma",
  "appId": "1:425260412899:web:7616cc475706af7417bad6",
  "storageBucket": "julies-gourmet-goma.firebasestorage.app",
  "apiKey": "AIzaSyDNO5oCWhxSAJ_54HyDr50MJEilbQCKzxY",
  "authDomain": "julies-gourmet-goma.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "425260412899"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
