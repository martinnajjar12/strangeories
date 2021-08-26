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
import { FormEvent, RefObject, useContext, useRef, useState } from 'react';
import axios from 'axios';
import DetailsIcon from '@material-ui/icons/Details';
import ExposurePlus1Icon from '@material-ui/icons/ExposurePlus1';
import ExposureNeg1Icon from '@material-ui/icons/ExposureNeg1';
import { green } from '@material-ui/core/colors';
import { UserContext } from '../auth/UserContext';
import { useRouter } from 'next/dist/client/router';
import { newToken } from '../typeScriptInterfaces';
import Cookies from 'js-cookie';

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
  author: { name: string};
  id: string;
}) {
  const classes = useStyles();
  const { token, setToken } = useContext(UserContext);
  const plusRef: RefObject<SVGSVGElement> = useRef(null);
  const minusRef: RefObject<SVGSVGElement> = useRef(null);
  const router = useRouter();

  const emptyToken = {
    uid: '',
    'access-token': '',
    'token-type': '',
    expiry: '',
    client: ''
  }

  const noUser: boolean = JSON.stringify(token) === JSON.stringify(emptyToken);

  const handlePlusButton = async (e: FormEvent<HTMLButtonElement>) => {
    if (noUser) {
      router.push('/sign-in');      
    } else {
      const id = plusRef.current?.id;

      const res = await axios.post(
        `https://strangeories.herokuapp.com/api/v1/stories/${id}/likes`, {}, {
          headers: token
        }
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
    }
  };

  const handleMinusButton = async (e: FormEvent<HTMLButtonElement>) => {
    if (noUser) {
      router.push('/sign-in');
    } else {
      const id = minusRef.current?.id;

      const res = await axios.post(
        `https://strangeories.herokuapp.com/api/v1/stories/${id}/dislikes`, {}, {
          headers: token
        }
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
    }
  };

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          className={classes.cardHeader}
          title={title}
          subheader={author.name}
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
            <ExposurePlus1Icon fontSize="large" id={id} ref={plusRef} />
          </IconButton>
          <IconButton color="secondary" onClick={e => handleMinusButton(e)}>
            <ExposureNeg1Icon id={id} fontSize="large" ref={minusRef} />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}
