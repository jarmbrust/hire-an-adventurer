import type { AppProps } from 'next/app';
import { SelectedAdventurersProvider } from '@/context/selected-adventurers-context';
import { ThemeProvider } from '@/context/theme-context';
import { ScoreProvider } from '@/context/score-context';

// Three contexts are getting to be a bit much, will likely refactor to use redux
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ScoreProvider>
        <SelectedAdventurersProvider>
          <Component {...pageProps} />
        </SelectedAdventurersProvider>
      </ScoreProvider>
    </ThemeProvider>
  );
}

export default MyApp;