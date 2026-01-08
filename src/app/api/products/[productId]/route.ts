import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const product = await prisma.product.findUnique({
      where: { id: params.productId },
      include: { shop: true },
    });

    if (!product || product.shop.ownerId !== session.user.id) {
      return NextResponse.json(
        { error: "Not allowed" },
        { status: 403 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: { id: params.productId },
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        stock: body.stock,
        category: body.category,
        tags: body.tags,
        image: body.images?.[0],
        isFeatured: body.isFeatured,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const product = await prisma.product.findUnique({
      where: { id: params.productId },
      include: { shop: true },
    });

    if (!product || product.shop.ownerId !== session.user.id) {
      return NextResponse.json(
        { error: "Not allowed" },
        { status: 403 }
      );
    }

    await prisma.product.delete({
      where: { id: params.productId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

