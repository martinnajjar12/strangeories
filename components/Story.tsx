import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 800,
      margin: '10px auto',
    },
    cardHeader: {
      textAlign: 'center',
    },
    media: {
      height: 0,
      paddingTop: '56.25%',
    },
  }),
);

export default function Story() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.cardHeader}
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        className={classes.media}
        image="https://image.shutterstock.com/image-photo/strange-man-metal-head-rocker-260nw-1464278996.jpg"
        title="Strange Photo"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained">
          Read Full Story
        </Button>
        <Button color="primary" variant="contained">
          Upvote
        </Button>
        <Button color="primary" variant="outlined">
          Downvote
        </Button>
      </CardActions>
    </Card>
  );
}
