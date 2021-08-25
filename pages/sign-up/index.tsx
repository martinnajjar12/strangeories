import React, { FormEvent, useState } from 'react';
import { Button, TextField, Paper, Typography, Container, makeStyles } from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useContext } from 'react';
import { UserContext } from '../../auth/UserContext';

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

const SignUp = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { token, setToken } = useContext(UserContext);
  const router = useRouter();

  const submitHandler = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://strangeories.herokuapp.com/auth/sign_in', {email, password, passwordConfirmation, name});
      setToken({
        uid: res.headers.uid,
        'access-token': res.headers['access-token'],
        expiry: res.headers.expiry,
        client: res.headers.client,
        'token-type': res.headers['token-type']
      });
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
      setName('');
      router.push('/');
    } catch (error) {
      console.log(error);
    }
    
    
  }

  return (
      <Container className={classes.containerWidth}>
        <Paper className={classes.paperDimensions}>
          <form>
            <Typography className={classes.typographyMargin} variant="h1" align="center">Sign Up</Typography>
            <TextField
              value={name}
              onChange={e => setName(e.target.value)}
              autoFocus
              required
              color="primary"
              variant="outlined"
              fullWidth
              type="text"
              margin="normal"
              label="Name"
            />
            <TextField
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              color="primary"
              variant="outlined"
              fullWidth
              type="email"
              margin="normal"
              label="Email"
            />
            <TextField
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              color="primary"
              variant="outlined"
              fullWidth
              type="password"
              margin="normal"
              label="Password"
            />
            <TextField
              value={passwordConfirmation}
              onChange={e => setPasswordConfirmation(e.target.value)}
              required
              color="primary"
              variant="outlined"
              fullWidth
              type="password"
              margin="normal"
              label="Password Confirmation"
            />
            <Button
              type="submit"
              color="primary"
              fullWidth
              variant="contained"
              onClick={e => submitHandler(e)}
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      </Container>
  )
}

export default SignUp;