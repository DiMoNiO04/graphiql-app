import React from 'react';
import { getSession } from '../lib/auth/getUserData';

export default async function Home() {
  const session = await getSession();

  console.log(session?.name);
  return (
    <main>
      {session ? (
        <h1>Welcome, {session.name}</h1>
      ) : (
        <div>
          <button>SignIn</button>
        </div>
      )}
    </main>
  );
}
