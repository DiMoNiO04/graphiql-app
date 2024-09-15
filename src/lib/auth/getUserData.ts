import { cookies } from 'next/headers';
import { getFirebaseAuth } from '../../app/firebase/firebase-admin';
import { SessionResult } from '@/src/types/sessionResult';

export async function getSession(): Promise<SessionResult> {
  const cookieStore = cookies();
  const token = cookieStore.get('graphiql-app-f134va');

  console.log('Token from cookie:', token?.value ? 'exists' : 'not found');

  if (!token?.value) {
    console.log('No token found in cookie');
    return { error: 'No token found in cookie', expired: false };
  }

  try {
    const decodedToken = await getFirebaseAuth().verifyIdToken(token.value);
    console.log('Token successfully decoded');
    return { user: decodedToken, expired: false };
  } catch (error: unknown) {
    console.error('Error verifying token:', error);
    if (error instanceof Error && 'code' in error) {
      if (error.code === 'auth/id-token-expired') {
        console.log('Token expired, deleting cookie');
        return { error: 'Token expired', expired: true };
      }
      return { error: error.message, expired: error.code === 'auth/id-token-expired' };
    }

    return { error: 'An unknown error occurred', expired: false };
  }
}
