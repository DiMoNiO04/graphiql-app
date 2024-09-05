import { auth } from '@/src/app/firebase/config';
import { AuthFormData } from '@/src/types/authTypes';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';

export const useSignInUser = () => {
  const t = useTranslations('MainPage');
  const router = useRouter();
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const handleSignIn = async (data: AuthFormData) => {
    const { email, password } = data;
    try {
      const userCredential = await signInWithEmailAndPassword(email, password);
      const token = await userCredential?.user.getIdToken();
      setCookie('graphiql-app-f134va', token);
      if (userCredential && userCredential.user) {
        toast.success(t('toast-in.success'));
        router.push('/');
        router.refresh();
      } else {
        toast.error(t('toast-in.errorr'));
      }
    } catch (e) {
      console.error(t('toast-in.console'), e);
      toast.error(t('toast-in.error'));
    }
  };

  return { handleSignIn };
};
