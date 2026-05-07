'use client'

import { useState } from 'react'

export default function SignupPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const submit = async (e: any) => {
    e.preventDefault()

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await res.json()

    if (data.success) {
      alert('Welcome! You are now a Community Member.')
    } else {
      alert(data.error)
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>

      <form onSubmit={submit}>
        <input
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit">Create Account</button>
      </form>
    </div>
  )
}