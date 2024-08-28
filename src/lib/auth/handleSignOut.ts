import { auth } from '@/src/app/firebase/config';
import { deleteCookie } from 'cookies-next';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const SignOutHandler = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      deleteCookie('graphiql-app-f134va');

      setOpen(false);
      toast.success('You have been signed out successfully.');
      router.push('/signin');
      router.refresh();
    } catch (error) {
      console.error('Error signing out:', error);
      setOpen(false);
      toast.error('An error occurred while signing out. Please try again.');
    }
  };

  return { handleSignOut };
};
