import { auth } from '@/src/app/firebase/config';
import { AuthFormData } from '@/src/types/authTypes';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

import toast from 'react-hot-toast';

export const useSignInUser = () => {
  const router = useRouter();
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const handleSignIn = async (data: AuthFormData) => {
    const { email, password } = data;
    try {
      const userCredential = await signInWithEmailAndPassword(email, password);
      const token = await userCredential?.user.getIdToken();
      setCookie('graphiql-app-f134va', token);
      if (userCredential && userCredential.user) {
        router.push('/');
        router.refresh();
      } else {
        toast.error('Failed to sign in. Please try again.');
      }
    } catch (e) {
      console.error('Error during sign in:', e);
      toast.error('An error occurred during sign in. Please try again.');
    }
  };

  return { handleSignIn };
};
