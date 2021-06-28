import type { AppProps } from 'next/app';
import { CssBaseline, Container } from '@material-ui/core';
import Navbar from '../layout/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container>
        <Component {...pageProps} />
      </Container>
    </>
  );
}
export default MyApp;
