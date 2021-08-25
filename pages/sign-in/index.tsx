import React, { FormEvent, useContext, useState } from 'react';
import { Button, TextField, Paper, Typography, Container, makeStyles } from '@material-ui/core';
import axios from 'axios';
import { useToken } from '../../auth/useToken';
import { useRouter } from 'next/dist/client/router';
import { UserContext } from '../../auth/UserContext';
import Cookies from 'js-cookie';

const useStyles = makeStyles({
  containerWidth: {
    maxWidth: 600,
    marginTop: 40,
  },
  paperDimensions: {
    padding: 30,
  },
  typographyMargin: {
    marginBottom: 50,
  }
})

interface newToken {
  uid: string
  'access-token': string
  'token-type': string
  expiry: string
  client: string
}

const SignIn = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useContext(UserContext)
  const router = useRouter()

  const submitHandler = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://strangeories.herokuapp.com/auth/sign_in', {email, password});
      const newToken: newToken = {
        uid: res.headers.uid,
        'access-token': res.headers['access-token'],
        expiry: res.headers.expiry,
        client: res.headers.client,
        'token-type': res.headers['token-type']
      }
      Cookies.set('token', JSON.stringify(newToken));
      setToken(newToken);
      setEmail('');
      setPassword('');
      router.push('/');
    } catch (error) {
      console.log(error);
    } 
  }

  return (
      <Container className={classes.containerWidth}>
        <Paper className={classes.paperDimensions}>
          <form>
            <Typography className={classes.typographyMargin} variant="h1" align="center">Log In</Typography>
            <TextField value={email} onChange={e => setEmail(e.target.value)} autoFocus required color="primary" variant="outlined" fullWidth type="email" margin="normal" label="Email" />
            <TextField value={password} onChange={e => setPassword(e.target.value)} required color="primary" variant="outlined" fullWidth type="password" margin="normal" label="Password" />
            <Button type="submit" color="primary" fullWidth variant="contained" onClick={e => submitHandler(e)}>Sign In</Button>
          </form>
        </Paper>
      </Container>
  )
}

export default SignIn;