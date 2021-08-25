import type { AppProps } from 'next/app';
import { CssBaseline, Container } from '@material-ui/core';
import Navbar from '../layout/Navbar';
import { UserContextProvider } from '../auth/UserContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <CssBaseline />
      <Navbar />
      <Container>
        <Component {...pageProps} />
      </Container>
    </UserContextProvider>
  );
}
export default MyApp;
