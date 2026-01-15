import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const shop = await prisma.shop.findUnique({
    where: { slug: params.slug },
    include: {
      products: {
        where: { stock: { gt: 0 } },
        select: {
          id: true,
          name: true,
          price: true,
          image: true,
          slug: true,
        },
      },
      owner: {
        select: {
          email: true,
          username: true,
          image: true,
        },
      },
    },
  });

  if (!shop) {
    return Response.json({ error: "Shop not found" }, { status: 404 });
  }

  if (shop.owner.email !== session.user.email) {
    return Response.json(
      { error: "Forbidden: Not your shop" },
      { status: 403 }
    );
  }

  return Response.json(shop);
}
