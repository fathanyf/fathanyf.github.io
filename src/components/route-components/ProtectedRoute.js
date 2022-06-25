import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { auth } from '../../config/firebase';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/auth/signin');
      }
    });
  }, [router]);
  return children;
};

export default ProtectedRoute;
