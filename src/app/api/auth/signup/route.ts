"use server"
import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ message: "This method is not supported!" });
}

export async function POST(req: NextApiRequest) {
  const { name, email, password, username } = req.body
  console.log(req.body)

  if (!name || !email || !password || !username) {
    return NextResponse.json({ error: "Please fill in all fields" })
  }

  try {
    // Check if user already exists (email or username)
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json({ error: "User with this email or username already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: hashedPassword,
      },
    })

    return NextResponse.json({ message: "User created successfully", user })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal server error" })
  }
}
