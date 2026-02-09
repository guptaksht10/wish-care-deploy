import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

type Params = {
  username: string;
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { username } = await params; // ✅ await params

  const user = await prisma.user.findUnique({
    where: { username },

    include: {
      followers: {
        include: {
          follower: {
            select: {
              id: true,
              name: true,
              username: true,
              bio: true,
              image: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    user.followers.map((f) => f.follower)
  );
}
