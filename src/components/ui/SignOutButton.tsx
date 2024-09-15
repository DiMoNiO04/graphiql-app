'use client';
import React from 'react';
import { SignOutHandler } from '../../lib/auth/handleSignOut';
import { useTranslations } from 'next-intl';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './../../../src/components/ui/alert-dialog';

const SignOutButton = () => {
  const t = useTranslations('MainPage');
  const { handleSignOut } = SignOutHandler();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="bg-[#18181B] text-white px-5 py-2 rounded-md flex items-center gap-2 hover:bg-[#18181B]/80 transition-all duration-300 font-medium">
          {t('sign-out')}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('dialog-title')}</AlertDialogTitle>
          <AlertDialogDescription>{t('dialog-text')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel> {t('cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={handleSignOut}>{t('sign-out')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SignOutButton;
