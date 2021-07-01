import {
  TextField,
  makeStyles,
  Container,
  Typography,
  Button,
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
        <TextField
          fullWidth
          label="Description"
          required
          variant="outlined"
          margin="dense"
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
