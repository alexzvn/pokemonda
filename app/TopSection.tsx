'use client'

import Link from "next/link"
import { getUser } from "~/context/UserContext";
import LikeSection from "./LikedSection";


export default function TopSection() {
  const user = getUser()

  return (
    <section>
      <div className="grid place-content-center mt-5">
        { user
          ?
          <p className="underline text-pretty text-primary"><Link href="/dashboard">Hello, {user.name}</Link></p>
          :
          <Link href="/login" className="btn btn-primary btn-outline">Login</Link>
        }
      </div>

      { user && <LikeSection />}
    </section>
  )
}
