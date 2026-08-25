import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App singleton
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with the specific provisioned database ID
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

// Test connection on boot per Firebase skill guidelines
export async function testFirestoreConnection() {
  try {
    // Attempt a light server fetch to test connection
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error: any) {
    if (error?.code === 'unavailable' || (error instanceof Error && (error.message.includes('offline') || error.message.includes('unavailable')))) {
      // Normal offline or delayed connection in sandboxed preview, client operates in offline mode
      return;
    }
  }
}
