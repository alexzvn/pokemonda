import { NextResponse, NextRequest } from "next/server"
import { cookie, tokenizer, user } from "./me/route"
import dayjs from "dayjs"
import { serialize } from "cookie"

export const POST = async (req: NextRequest) => {
  const { username, password } = await req.json()

  if (username !== user.username || user.password !== password) {
    return NextResponse.json({ message: 'Incorrect Credentials' }, { status: 401 })
  }

  const expires = dayjs().add(7, 'day')
  const token = tokenizer.create(username, 'user', expires.unix())

  return NextResponse.json({ ...user, password: undefined }, {
    headers: { 'Set-Cookie': cookie('session', token, expires.toDate()) }
  })
}

export const DELETE = async (req: NextRequest) => {
  return NextResponse.json({ message: 'oke' }, {
    headers: { 'Set-Cookie': cookie('session', '?', new Date) }
  })
}
