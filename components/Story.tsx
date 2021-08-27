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
import {
  FormEvent,
  RefObject,
  useContext,
  useRef,
  useState,
} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import DetailsIcon from '@material-ui/icons/Details';
import ExposurePlus1Icon from '@material-ui/icons/ExposurePlus1';
import ExposureNeg1Icon from '@material-ui/icons/ExposureNeg1';
import { green } from '@material-ui/core/colors';
import { UserContext } from '../auth/UserContext';
import { useRouter } from 'next/dist/client/router';
import { newToken } from '../typeScriptInterfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 800,
      margin: '10px auto',
    },
    cardHeader: {
      textAlign: 'center',
      '& h2': {
        fontSize: 'inherit',
        margin: 'inherit',
        fontWeight: 'inherit',
      },
      '& h3': {
        fontSize: 'inherit',
        margin: 'inherit',
        fontWeight: 'inherit',
      }
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
  likes,
  dislikes,
}: {
  title: string;
  description: string;
  imageUrl: string;
  author: { name: string};
  id: string;
  likes: any[];
  dislikes: any[];
}) {
  const classes = useStyles();
  const { token, setToken } = useContext(UserContext);
  const [localLikes, setLocalLikes] = useState(likes.length);
  const [localDislikes, setLocalDislikes] = useState(dislikes.length);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const plusRef: RefObject<SVGSVGElement> = useRef(null);
  const minusRef: RefObject<SVGSVGElement> = useRef(null);
  const router = useRouter();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const emptyToken = {
    uid: '',
    'access-token': '',
    'token-type': '',
    expiry: '',
    client: ''
  }

  const noUser: boolean = JSON.stringify(token) === JSON.stringify(emptyToken);

  const likesDislikesHandler = async (e: FormEvent<HTMLButtonElement>, likeOrDislike: string) => {
    if (noUser) {
      router.push('/sign-in');      
    } else {
      const id = likeOrDislike === 'likes' ? plusRef.current?.id.split('-')[1] : minusRef.current?.id.split('-')[1];

      try {
        const res = await axios.post(
          `https://strangeories.herokuapp.com/api/v1/stories/${id}/${likeOrDislike}`, {}, {
            headers: token
          }
        );

        if (res.headers['access-token']) {
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

        likeOrDislike === 'likes' ? setLocalLikes(res.data.likes.length) : setLocalDislikes(res.data.dislikes.length);
      } catch (error) {
        if (error.response.headers['access-token']) {
          const newToken: newToken = {
            uid: error.response.headers.uid,
            'access-token': error.response.headers['access-token'],
            expiry: error.response.headers.expiry,
            client: error.response.headers.client,
            'token-type': error.response.headers['token-type']
          }

          Cookies.set('token', JSON.stringify(newToken));
          setToken(newToken);
        }
        error.response.data['author_id']
        ? setErrorMessage("You've already liked or disliked this story")
        : setErrorMessage('Sorry, something went wrong!')
        setOpen(true);
      }
    }
  };

  return (
    <>
      <Card className={classes.root} component="article">
        <CardHeader
          className={classes.cardHeader}
          title={<h2>{title}</h2>}
          subheader={<h3>{author.name}</h3>}
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
          <Typography color="primary">{localLikes}</Typography>
          <IconButton color="primary" onClick={e => likesDislikesHandler(e, 'likes')}>
            <ExposurePlus1Icon fontSize="large" id={`plus-${id}`} ref={plusRef} />
          </IconButton>
          <IconButton color="secondary" onClick={e => likesDislikesHandler(e, 'dislikes')}>
            <ExposureNeg1Icon id={`minus-${id}`} fontSize="large" ref={minusRef} />
          </IconButton>
          <Typography color="secondary">-{localDislikes}</Typography>
        </CardActions>
      </Card>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <MuiAlert elevation={6} variant="filled" severity="error" onClose={handleClose}>
          {errorMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
