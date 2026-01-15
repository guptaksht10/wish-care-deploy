import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";
import { getServerSession } from "next-auth";


export async function GET() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
      username: true,
      bio: true,
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
  // console.log(user);
  return NextResponse.json(user);
}

export async function PATCH(req: Request) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { name, image, bio } = body;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      ...(name !== undefined && { name }),
      ...(image !== undefined && { image }),
      ...(bio !== undefined && { bio }),
    },
  });

  return NextResponse.json(updatedUser);
}
