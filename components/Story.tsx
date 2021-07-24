import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from '@material-ui/core';
import { FormEvent } from 'react';
import axios from 'axios';
import DetailsIcon from '@material-ui/icons/Details';
import ExposurePlus1Icon from '@material-ui/icons/ExposurePlus1';
import ExposureNeg1Icon from '@material-ui/icons/ExposureNeg1';
import { green } from '@material-ui/core/colors';

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
  id,
}: {
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  id: string;
}) {
  const classes = useStyles();

  const handlePlusButton = async (e: FormEvent<HTMLButtonElement>) => {
    const id = e.target.getAttribute('id');
    console.log(id);
    await axios
      .post(`https://strangeories.herokuapp.com/api/v1/stories/${id}/likes`, {
        count: 1,
      })
      .then(response => console.log(response))
      .catch(err => console.error(err));
  };

  const handleMinusButton = async (e: FormEvent<HTMLButtonElement>) => {
    const id = e.target.getAttribute('id');
    console.log(id);
    await axios
      .post(
        `https://strangeories.herokuapp.com/api/v1/stories/${id}/dislikes`,
        {
          count: 1,
        },
      )
      .then(response => console.log(response))
      .catch(err => console.error(err));
  };

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
        <IconButton style={{ color: green[500] }}>
          <DetailsIcon fontSize="large" />
        </IconButton>
        <IconButton color="primary" onClick={e => handlePlusButton(e)}>
          <ExposurePlus1Icon fontSize="large" id={id} />
        </IconButton>
        <IconButton color="secondary" onClick={e => handleMinusButton(e)}>
          <ExposureNeg1Icon id={id} fontSize="large" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
