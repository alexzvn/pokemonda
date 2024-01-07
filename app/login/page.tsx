"use client"

import { Field, Form, Formik } from "formik"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const [error, setError] = useState('')

  const route = useRouter()

  const login = async (credentials: { username: string, password: string }) => {
    const res = await fetch('/api/auth', {
      method: 'post',
      body: JSON.stringify(credentials)
    })

    if (! res.ok) {
      return setError(await res.json().then(res => res.message))
    }

    route.push('/dashboard')
  }
  
  return (
    <main className="bg-base-200 min-h-screen pt-20">
      <div className="card bg-base-100 mx-auto max-w-md">
        <div className="card-body">
          <h2 className="card-title">Login Dashboard</h2>

          <Formik initialValues={{ username: '', password: '' }} onSubmit={login}>
            <Form className="w-full mt-5" onFocus={e => setError('')}>
              <div className="form-control">
                <label htmlFor="username" className="label">Username</label>
                <Field className="input input-bordered" name="username" type="text" required />
              </div>

              <div className="form-control">
                <label htmlFor="password" className="label">Password</label>
                <Field className="input input-bordered" name="password" type="password" required />
                {error && <label className="label text-error">{error}</label>}
              </div>

              <div className="mt-3 grid place-content-center">
                <button className="btn btn-primary px-10">Sign In</button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </main>
  )
}