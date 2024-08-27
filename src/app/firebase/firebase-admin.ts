import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
};

export const initializeFirebaseAdmin = () => {
  if (!getApps().length) {
    initializeApp(firebaseAdminConfig);
  }
};

export const getFirebaseAuth = () => {
  initializeFirebaseAdmin();
  return getAuth();
};
