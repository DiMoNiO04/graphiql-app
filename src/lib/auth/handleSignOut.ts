import { auth } from '../../app/firebase/config';
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
      toast.success(t('success-out'));
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error(t('console-out'), error);
      setOpen(false);
      toast.error(t('error-out'));
    }
  };

  return { handleSignOut };
};
