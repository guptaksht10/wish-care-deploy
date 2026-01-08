import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";


export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
    include: {
      followers: {
        include: {
          follower: {
            select: {
              id: true,
              name: true,
              username: true,
              image: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user.followers.map(f => f.follower));
}
