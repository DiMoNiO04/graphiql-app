'use client';

import { checkAndClearSession } from '../../app/actions/session';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function SessionHandler() {
  const router = useRouter();
  useEffect(() => {
    const handleSession = async () => {
      const result = await checkAndClearSession();
      toast.error('Session expired. Please log in again.');
      setTimeout(() => router.push('/signin'), 2000);
    };

    handleSession();
  }, [router]);

  return <div>Checking session...</div>;
}
