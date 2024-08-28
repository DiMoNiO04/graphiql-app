import { auth } from '@/src/app/firebase/config';
import { AuthFormData } from '@/src/types/authTypes';
import { useRouter } from 'next/navigation';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';

export const useSignUpUser = () => {
  const router = useRouter();
  const [updateProfile] = useUpdateProfile(auth);
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const onSubmit = async (data: AuthFormData) => {
    try {
      const { email, password, username } = data;
      await createUserWithEmailAndPassword(email, password);
      await updateProfile({ displayName: username });
      toast.success('Account created successfully');
      setTimeout(() => {
        router.push('/signin');
      }, 1000);
    } catch (error) {
      console.log('Unexpected error:', error);
    }
  };

  return { onSubmit };
};
