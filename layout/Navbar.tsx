import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  createStyles,
  Theme,
  Container,
  Grid,
  Button,
} from '@material-ui/core';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { UserContext } from '../auth/UserContext';
import { useToken } from '../auth/useToken';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      '& a': {
        marginRight: 15,
        color: '#fff',
        textDecoration: 'none',
        fontSize: 16,
      },
      '& a:hover': {
        color: '#f50057',
      },
    },
  }),
);

const Navbar = () => {
  useToken()
  const classes = useStyles();
  const { token, setToken } = useContext(UserContext);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (JSON.stringify(token) == JSON.stringify({
      uid: '',
      'access-token': '',
      'token-type': '',
      expiry: '',
      client: ''
    })) {
      setIsLogged(false);
    } else {
      setIsLogged(true);
    }
  }, [token]);
 

  if (!isLogged) return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Container>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h6">Strangeories</Typography>
              </Grid>
              <Grid item className={classes.grid}>
                <Link href="/">All Stories</Link>
                <Link href="/sign-in">Login</Link>
                <Link href="/sign-up">Register</Link>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  )

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Container>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h6">Strangeories</Typography>
              </Grid>
              <Grid item className={classes.grid}>
                <Link href="/">All Stories</Link>
                <Link href="/story/new">Create Story</Link>
                <Button onClick={() => {
                  Cookies.remove('token')
                  setToken({
                    uid: '',
                    'access-token': '',
                    'token-type': '',
                    expiry: '',
                    client: ''
                  })
                }}>
                  Sign Out
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
