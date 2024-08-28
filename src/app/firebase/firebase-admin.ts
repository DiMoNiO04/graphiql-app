import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  }),
};

export const initializeFirebaseAdmin = () => {
  if (!getApps().length) {
    try {
      console.log('Initializing Firebase Admin');
      initializeApp(firebaseAdminConfig);
    } catch (error) {
      console.error('Error initializing Firebase Admin:', error);
    }
  }
};

export const getFirebaseAuth = () => {
  initializeFirebaseAdmin();
  return getAuth();
};
