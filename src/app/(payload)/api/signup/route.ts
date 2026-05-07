import { NextResponse } from 'next/server'
import  {getPayload}  from 'payload'
import config from '@/payload.config'


export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config })

    const body = await request.json()

    const { name, email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const user = await payload.create({
      collection: 'users',
      data: {
        name,
        email,
        password,
        role: 'community',
      },
    })

    return NextResponse.json({
      success: true,
      user,
    })
  } catch (err: any) {
    console.error(err)

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}