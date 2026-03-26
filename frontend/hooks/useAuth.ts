import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../services/authService';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const loginUser = async (username: string, password: string) => {
    setLoading(true);
    setErrorMsg('');
    
    try {
      await authService.login(username, password);
      router.push('/dashboard'); 
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, errorMsg };
};