import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      useErrorBoundary: true,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
