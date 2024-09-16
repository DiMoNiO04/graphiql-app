'use client';

import { checkAndClearSession } from '../../app/actions/session';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Loader from '../Loading/Loading';
import { useTranslations } from 'next-intl';

export default function SessionHandler() {
  const t = useTranslations('MainPage');
  const router = useRouter();
  useEffect(() => {
    const handleSession = async () => {
      const result = await checkAndClearSession();
      toast.error(t('toast-session'));
      setTimeout(() => router.push('/signin'), 3000);
    };

    handleSession();
  }, [router, t]);

  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
      <Loader size={100} />
    </div>
  );
}
