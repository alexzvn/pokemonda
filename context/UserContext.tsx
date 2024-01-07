'use client';

import { createContext, useContext, useEffect, useState } from "react";

export interface User {
  name: string
  username: string
  email: string
}

export const UserContext = createContext({
  resolved: false,
  user: undefined as User|undefined
})

export const getUser = () => useContext(UserContext).user

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(undefined)
  const [resolved, setResolved] = useState(false)

  useEffect(() => {
    fetch('/api/auth/me')
      .then(async (res) => res.ok && setUser(await res.json()))
      .finally(() => setResolved(true))
  }, [])

  return (
    <UserContext.Provider value={{ user, resolved }}>
      {children}
    </UserContext.Provider>
  )
}