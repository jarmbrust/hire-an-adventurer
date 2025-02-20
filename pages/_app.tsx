import type { AppProps } from 'next/app';
import { SelectedAdventurersProvider } from '@/context/selected-adventurers-context';
import { ThemeProvider } from '@/context/theme-context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <SelectedAdventurersProvider>
        <Component {...pageProps} />
      </SelectedAdventurersProvider>
    </ThemeProvider>
  );
}

export default MyApp;