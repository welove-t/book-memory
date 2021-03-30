import Head from 'next/head';
import { createContext, useEffect, useState } from 'react';
import { fuego } from '../utils/firebase';
import 'tailwindcss/tailwind.css';
import { User } from 'firebase';
import { FuegoProvider } from '@nandorojo/swr-firestore';

type AuthContextProps = {
  currentUser: User | null | undefined;
};

export const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
});

const MyApp = ({ Component, pageProps }: any) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );

  useEffect(() => {
    fuego.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  });

  return (
    <>
      <Head>
        <link rel='shortcut icon' href='/favicon.ico' />
      </Head>
      <FuegoProvider fuego={fuego}>
        <Component {...pageProps} />
      </FuegoProvider>
    </>
  );
};

export default MyApp;
