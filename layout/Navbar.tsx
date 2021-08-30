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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      display: 'flex',
      listStyle: 'none',
      alignItem: 'center',
      justifyContent: 'space-between',
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
  const classes = useStyles();
  const { token, setToken } = useContext(UserContext);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (
      JSON.stringify(token) ==
      JSON.stringify({
        uid: '',
        'access-token': '',
        'token-type': '',
        expiry: '',
        client: '',
      })
    ) {
      setIsLogged(false);
    } else {
      setIsLogged(true);
    }
  }, [token]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Container>
            <Grid
              component="nav"
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h6">Strangeories</Typography>
              </Grid>
              <Grid component="ul" item className={classes.grid}>
                <li>
                  <Link href="/">All Stories</Link>
                </li>
                {isLogged ? (
                  <>
                    <li>
                      <Link href="/story/new">Create Story</Link>
                    </li>
                    <li>
                      <Button
                        onClick={() => {
                          Cookies.remove('token');
                          setToken({
                            uid: '',
                            'access-token': '',
                            'token-type': '',
                            expiry: '',
                            client: '',
                          });
                        }}
                        color="secondary"
                        variant="outlined"
                      >
                        Sign Out
                      </Button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link href="/sign-in">Login</Link>
                    </li>
                    <li>
                      <Link href="/sign-up">Register</Link>
                    </li>
                  </>
                )}
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
