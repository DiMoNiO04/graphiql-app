'use server';

import { cookies } from 'next/headers';
import { getSession } from '@/src/lib/auth/getUserData';

export async function checkAndClearSession() {
  const result = await getSession();

  if (result.expired) {
    cookies().delete('graphiql-app-f134va');
  }

  return result;
}
