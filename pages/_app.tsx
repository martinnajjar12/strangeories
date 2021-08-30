import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CssBaseline, Container } from '@material-ui/core';
import Navbar from '../layout/Navbar';
import { UserContextProvider } from '../auth/UserContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Strangeories</title>
      </Head>
      <UserContextProvider>
        <CssBaseline />
        <Navbar />
        <Container component="main">
          <Component {...pageProps} />
        </Container>
      </UserContextProvider>
    </>
  );
}
export default MyApp;
