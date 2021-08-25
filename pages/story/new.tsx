import {
  TextField,
  makeStyles,
  Container,
  Typography,
  Button,
  Paper,
} from '@material-ui/core';
import { FormEvent, useContext, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

import { UserContext } from '../../auth/UserContext';
import { useRouter } from 'next/dist/client/router';
import { newToken } from '../../typeScriptInterfaces';
import { DropzoneArea } from 'material-ui-dropzone';

const initialState: {
  title: string,
  image: string | Blob,
  description: string
} = {
  title: '',
  image: '',
  description: '',
};

const useStyles = makeStyles({
  containerWidth: {
    maxWidth: 600,
    marginTop: 40,
  },
  paperDimensions: {
    padding: 30,
  },
  typographyMargin: {
    marginBottom: 40,
  },
  textareaFullWidth: {
    width: '100%',
    marginTop: 16,
    marginBottom: 8,
    padding: 10,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontSize: 16,
    borderColor: '#c0c0c0',
    borderRadius: 5,
    color: 'rgba(0, 0, 0, 0.87)',
    '&:hover': {
      borderColor: 'rgba(0, 0, 0, 0.87)',
    },
    '&:focus': {
      outlineColor: '#303f9f',
    },
  },
  dropZoneMargin: {
    marginTop: 16,
    marginBottom: 8,
  },
  buttonMargin: {
    marginTop: 16,
    marginBottom: 8,
  }
})

const Form = () => {
  const classes = useStyles();
  const [state, setState] = useState(initialState);
  const { token, setToken } = useContext(UserContext);
  const router = useRouter();

  const emptyToken = {
    uid: '',
    'access-token': '',
    'token-type': '',
    expiry: '',
    client: ''
  }

  const noUser: boolean = JSON.stringify(token) === JSON.stringify(emptyToken)

  const changeValue = (key: string, value: string | File) => setState({ ...state, [key]: value });

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (noUser) {
      router.push('/sign-in');
    } else {
      const data = new FormData();
      data.append('image', state.image);
      data.append('title', state.title);
      data.append('description', state.description);

      const res = await axios.post(
        'https://strangeories.herokuapp.com/api/v1/stories',
        data,
        {
          headers: token,
        },
      );
      const newToken: newToken = {
        uid: res.headers.uid,
        'access-token': res.headers['access-token'],
        expiry: res.headers.expiry,
        client: res.headers.client,
        'token-type': res.headers['token-type']
      }

      Cookies.set('token', JSON.stringify(newToken));
      setToken(newToken);
      setState(initialState);
      router.push('/');
    }
  };

  return (
    <Container className={classes.containerWidth}>
      <Paper className={classes.paperDimensions}>
        <form>
          <Typography
            align="center"
            component="h1"
            variant="h2"
            className={classes.typographyMargin}
          >
            CREATE STORY
          </Typography>
          <TextField
            value={state.title}
            onChange={e => changeValue('title', e.target.value)}
            autoFocus
            required
            fullWidth
            color="primary"
            variant="outlined"
            label="Title"
            margin="normal"
          />
          <DropzoneArea
            onChange={files => changeValue('image', files[0])}
            acceptedFiles={['image/*']}
            dropzoneText={"Drag and drop an image here or click"}
            showAlerts={['error']}
            filesLimit={1}
            dropzoneClass={classes.dropZoneMargin}
          />
          <textarea
            value={state.description}
            rows={4}
            placeholder="Description *"
            required
            className={classes.textareaFullWidth}
            onChange={e => changeValue('description', e.target.value)}
          />
          <Button
            type="button"
            color="primary"
            fullWidth
            variant="contained"
            onClick={e => handleSubmit(e)}
            className={classes.buttonMargin}
          >
            Create Story
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Form;
