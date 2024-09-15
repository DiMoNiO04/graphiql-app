'use client';

import { checkAndClearSession } from '../../app/actions/session';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Loader from '../Loading/Loading';

export default function SessionHandler() {
  const router = useRouter();
  useEffect(() => {
    const handleSession = async () => {
      const result = await checkAndClearSession();
      toast.error('Session expired. Please log in again.');
      setTimeout(() => router.push('/signin'), 3000);
    };

    handleSession();
  }, [router]);

  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
      <Loader size={100} />
    </div>
  );
}
