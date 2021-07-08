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

export default function Story({
  title,
  description,
  imageUrl,
  author,
}: {
  title: string;
  description: string;
  imageUrl: string;
  author: string;
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.cardHeader}
        title={title}
        subheader={author}
      />
      <CardMedia
        className={classes.media}
        image={imageUrl}
        title="Strange Photo"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
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
