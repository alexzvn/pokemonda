'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { getUser } from "~/context/UserContext"

export default function Dashboard() {
  const user = getUser()!
  const router = useRouter()

  const signOut = async () => {
    fetch('/api/auth', { method: 'delete' }).then(res => {
      res.ok && router.push('/')
    })
  }

  return (
    <main className="bg-base-200 pt-10 min-h-screen">
      <div className="card bg-base-100 max-w-lg mx-auto">
        <div className="card-body">
          <h1 className="card-title">Hello, {user.name}</h1>

          <div className="mt-3">
            <p>Your email: <strong>{user.email}</strong></p>
            <p>Your username: <strong>{user.username}</strong></p>
          </div>

          <div className="flex justify-between mt-5">
            <Link href="/" className="btn">Go Home</Link>
            <button onClick={signOut} className="btn btn-outline">Sign Out</button>
          </div>
        </div>
      </div>
    </main>
  )
}