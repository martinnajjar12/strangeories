import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  createStyles,
  Theme,
  Container,
  Grid,
} from '@material-ui/core';
import Link from 'next/link';

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
  const classes = useStyles();

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
                <Link href="/sign-in">Login</Link>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
