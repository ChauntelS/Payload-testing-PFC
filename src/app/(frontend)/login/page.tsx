'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault()

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.errors?.[0]?.message || 'Login failed')
        setLoading(false)
        return
      }

      router.push('/dashboard')
      router.refresh()

    } catch (err) {
      setError('Something went wrong')
    }

    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center">

      <div className="w-full max-w-md rounded-xl border p-8 shadow">

        <h1 className="mb-6 text-3xl font-bold">
          Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >

          <div>
            <label className="mb-1 block">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded border p-2"
              required
            />
          </div>

          <div>
            <label className="mb-1 block">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded border p-2"
              required
            />
          </div>

          {error && (
            <div className="text-red-500">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-black p-2 text-white"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>

      </div>

    </div>
  )
}

