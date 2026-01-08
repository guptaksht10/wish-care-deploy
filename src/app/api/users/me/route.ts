import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";
import { getServerSession } from "next-auth";


export async function GET() {
  const session = await getServerSession();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      image: true,
      role: true,
      shop: true,
      _count: {
        select: {
          followers: true,
          following: true,
        },
      },
    },
  });

  return NextResponse.json(user);
}


export async function PATCH(req: Request) {
  const session = await getServerSession();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, image, username } = body;

  // Optional: username uniqueness check
  if (username) {
    const exists = await prisma.user.findFirst({
      where: {
        username,
        NOT: { id: session.user.id },
      },
    });

    if (exists) {
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 400 }
      );
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name,
      image,
      username,
    },
  });

  return NextResponse.json(updatedUser);
}
