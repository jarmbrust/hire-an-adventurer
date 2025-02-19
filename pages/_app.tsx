import type { AppProps } from 'next/app';
import { SelectedAdventurersProvider } from '@/context/selected-adventurers-context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SelectedAdventurersProvider>
      <Component {...pageProps} />
    </SelectedAdventurersProvider>
  );
}

export default MyApp;