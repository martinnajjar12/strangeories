import type { AppProps } from 'next/app';
import { CssBaseline, Container } from '@material-ui/core';
import Navbar from '../layout/Navbar';
// import { useToken } from '../auth/useToken';
import { UserContextProvider } from '../auth/UserContext';

// interface newToken {
//   uid: string
//   'access-token': string
//   'token-type': string
//   expiry: string
//   client: string
// }

function MyApp({ Component, pageProps }: AppProps) {
  // const [token, setToken]: [newToken | null,  (newToken: newToken | null) => void] = useToken();

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
