import Header from '@/components/header/Header';
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Header />
      <Component {...pageProps} />
      <Toaster />
    </SessionProvider>
  );
}
