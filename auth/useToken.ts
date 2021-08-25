import { useState } from 'react'
import Cookies from 'js-cookie'

interface newToken {
  uid: string
  'access-token': string
  'token-type': string
  expiry: string
  client: string
}

export const useToken = () => {
  const [token, setTokenInternal] = useState(() => {
    const localToken = Cookies.get('token')
    if (localToken) return JSON.parse(localToken)
    return null
  })

  const setToken = (newToken: newToken | null) => {
    Cookies.set('token', JSON.stringify(newToken))
    setTokenInternal(newToken)
  }

  const returnedValue: [newToken | null,  (newToken: newToken | null) => void] = [token, setToken]

  return returnedValue
}
