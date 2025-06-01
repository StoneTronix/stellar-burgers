import { FC, SyntheticEvent, useState } from 'react';

import { useDispatch, AppDispatch } from '../../services/store';
import { loginUser } from '../../services/slices/userSlice';

import { LoginUI } from '@ui-pages';

export const Login: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault(); 
    dispatch(loginUser({email: email, password: password}));
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
