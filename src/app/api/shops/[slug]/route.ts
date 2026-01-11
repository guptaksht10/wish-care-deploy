import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
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
          username: true,
          image: true,
        },
      },
    },
  });

  if (!shop) {
    return Response.json({ error: "Shop not found" }, { status: 404 });
  }

  return Response.json(shop);
}
