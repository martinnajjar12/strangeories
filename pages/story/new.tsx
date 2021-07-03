import {
  TextField,
  makeStyles,
  Container,
  Typography,
  Button,
  TextareaAutosize,
} from '@material-ui/core';

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
        />
        <TextField
          fullWidth
          label="Author"
          required
          variant="outlined"
          margin="dense"
        />
        <TextField
          fullWidth
          label="Image URL"
          required
          type="url"
          variant="outlined"
          margin="dense"
        />
        <textarea
          rows={4}
          placeholder="Description *"
          required
          className={classes.textareaFullWidth}
        />
        <Button
          className={classes.buttonMargin}
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Form;
