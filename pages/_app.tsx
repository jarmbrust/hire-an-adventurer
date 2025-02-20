import type { AppProps } from 'next/app';
import { SelectedAdventurersProvider } from '@/context/selected-adventurers-context';
import { ThemeProvider } from '@/context/theme-context';
import { CoinsProvider } from '@/context/coins-context';

// Three contexts are getting to be a bit much, will likely refactor to use redux
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <CoinsProvider>
        <SelectedAdventurersProvider>
          <Component {...pageProps} />
        </SelectedAdventurersProvider>
      </CoinsProvider>
    </ThemeProvider>
  );
}

export default MyApp;