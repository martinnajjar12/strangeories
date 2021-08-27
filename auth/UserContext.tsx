import Cookies from 'js-cookie'
import React, { createContext, Dispatch, SetStateAction, useState } from 'react'
import { useEffect } from 'react';
import { UserContextInterface } from '../typeScriptInterfaces';



export const UserContext = createContext<UserContextInterface>({
  token: null,
  setToken: () => null 
})

export const UserContextProvider = ({ children }: {children: JSX.Element|JSX.Element[]}) => {
  const [token, setToken] = useState({
    uid: '',
    'access-token': '',
    'token-type': '',
    expiry: '',
    client: ''
  });

  useEffect(() => {
    const localToken = Cookies.get('token')
    if (localToken) setToken(JSON.parse(localToken));
  }, [])

  return (
    <UserContext.Provider value={{ token, setToken }}>
      { children }
    </UserContext.Provider>
  )
}
