import { serialize } from "cookie"
import { NextRequest, NextResponse } from "next/server"
import { createSWAT } from "swa-token"

export const user = {
  name: 'Alex',
  username: 'alexzvn',
  password: "alex123",
  email: "personal@alexzvn.me"
}

export const tokenizer = createSWAT(process.env.APP_SECRET!)

export const cookie = (name: string, value: string, expires?: Date) => serialize(name, value, {
  httpOnly: true,
  path: '/',
  expires: expires
})

export const GET = async (req: NextRequest) => {
  const session = req.cookies.get('session')

  if (!session || !session.value || !tokenizer.verify(session.value)) {

    return NextResponse.json({ message: 'Unauthorized' }, {
      status: 401,
      headers: { 'Set-Cookie': cookie('session', 'date', new Date) }
    })
  }

  return NextResponse.json({ ...user, password: undefined })
}