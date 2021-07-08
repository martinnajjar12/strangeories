import {
  TextField,
  makeStyles,
  Container,
  Typography,
  Button,
} from '@material-ui/core';
import { FormEvent, useState } from 'react';
import axios from 'axios';

const initialState = {
  title: '',
  author: '',
  imageUrl: '',
  description: '',
};

const useStyles = makeStyles({
  containerWidth: {
    maxWidth: 600,
    marginTop: 40,
  },
  formMargin: {
    marginTop: 40,
  },
  buttonMargin: {
    marginTop: 15,
  },
  textareaFullWidth: {
    width: '100%',
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
});

const Form = () => {
  const [state, setState] = useState(initialState);

  const changeValue = (key: string, value: string) => {
    setState({ ...state, [key]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await axios.post('/api/create', state);
    setState(initialState);
  };

  const classes = useStyles();
  return (
    <Container className={classes.containerWidth}>
      <Typography align="center" component="h1" variant="h4">
        CREATE STORY
      </Typography>
      <form className={classes.formMargin}>
        <TextField
          fullWidth
          label="Title"
          required
          variant="outlined"
          margin="dense"
          onChange={e => changeValue('title', e.target.value)}
        />
        <TextField
          fullWidth
          label="Author"
          required
          variant="outlined"
          margin="dense"
          onChange={e => changeValue('author', e.target.value)}
        />
        <TextField
          fullWidth
          label="Image URL"
          required
          type="url"
          variant="outlined"
          margin="dense"
          onChange={e => changeValue('imageUrl', e.target.value)}
        />
        <textarea
          rows={4}
          placeholder="Description *"
          required
          className={classes.textareaFullWidth}
          onChange={e => changeValue('description', e.target.value)}
        />
        <Button
          className={classes.buttonMargin}
          variant="contained"
          color="primary"
          type="button"
          fullWidth
          onClick={e => handleSubmit(e)}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Form;
