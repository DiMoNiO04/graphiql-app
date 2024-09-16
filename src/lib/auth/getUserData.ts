import { cookies } from 'next/headers';
import { getFirebaseAuth } from '../../app/firebase/firebase-admin';
import { SessionResult } from '@/src/types/sessionResult';

export async function getSession(): Promise<SessionResult> {
  const cookieStore = cookies();
  const token = cookieStore.get('graphiql-app-f134va');

  if (!token?.value) {
    return { error: 'No token found in cookie', expired: false };
  }

  try {
    const decodedToken = await getFirebaseAuth().verifyIdToken(token.value);
    return { user: decodedToken, expired: false };
  } catch (error: unknown) {
    console.error('Error verifying token:', error);
    if (error instanceof Error && 'code' in error) {
      if (error.code === 'auth/id-token-expired') {
        return { error: 'Token expired', expired: true };
      }
      return { error: error.message, expired: error.code === 'auth/id-token-expired' };
    }

    return { error: 'An unknown error occurred', expired: false };
  }
}
