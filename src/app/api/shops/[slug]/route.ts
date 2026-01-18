import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const shop = await prisma.shop.findUnique({
      where: { slug: slug },
      select: {
        id: true,
        name: true,
        slug: true,
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

    const products = await prisma.product.findMany({
      where: {
        shopId: shop.id,
        stock: { gt: 0 },
      },
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
        slug: true,
      },
    });

    return Response.json({
      ...shop,
      products,
    });
  } catch (error) {
    console.error("SHOP_GET_ERROR", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
