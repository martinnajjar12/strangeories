/* eslint camelcase: ["error", {allow: ["image_url"]}] */

import { Dispatch, SetStateAction } from 'react'

export interface UserContextInterface {
  token: {
    uid: string
    'access-token': string
    'token-type': string
    expiry: string
    client: string
  } | null,
  setToken: Dispatch<SetStateAction<{ uid: string; 'access-token': string; 'token-type': string; expiry: string; client: string; }>>
}

export interface newToken {
  uid: string
  'access-token': string
  'token-type': string
  expiry: string
  client: string
}

export interface strangeStoriesObjRails {
  title: string;
  description: string;
  id: string;
  image_url: string;
  author: string;
}

export interface strangeStoriesObj {
  title: string;
  description: string;
  id: string;
  imageUrl: string;
  author: {name: string};
}
