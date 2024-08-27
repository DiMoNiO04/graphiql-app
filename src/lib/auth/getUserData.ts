import { cookies } from 'next/headers';
import { getFirebaseAuth } from '../../app/firebase/firebase-admin';

export async function getSession() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  if (!token) {
    return null;
  }
  try {
    const decodedToken = await getFirebaseAuth().verifyIdToken(token.value);
    return decodedToken;
  } catch (error) {
    return null;
  }
}
