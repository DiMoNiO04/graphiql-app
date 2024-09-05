import { auth } from '@/src/app/firebase/config';
import { deleteCookie } from 'cookies-next';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';

export const SignOutHandler = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const router = useRouter();
  const t = useTranslations('MainPage');

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      deleteCookie('graphiql-app-f134va');

      setOpen(false);
      toast.success(t('toast-out.success'));
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error(t('toast-out.console'), error);
      setOpen(false);
      toast.error(t('toast-out.error'));
    }
  };

  return { handleSignOut };
};
