"use client"

import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { UserContext, UserProvider } from "~/context/UserContext"

function Fallback({ children }: React.PropsWithChildren) {
  const { resolved, user } = useContext(UserContext)
  const router = useRouter()

  useEffect(() => {
    if (resolved && !user) {
      router.push('/login')
    }
  }, [resolved])

  if (!user) {
    return (
      <div className="bg-base-200 grid place-content-center min-h-screen">
        <h2 className="text-xl">Please Wait a Moment...</h2>
      </div>
    )
  }

  return <>{children}</>
}

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  return (
    <UserProvider>
      <Fallback>{children}</Fallback>
    </UserProvider>
  )
}
