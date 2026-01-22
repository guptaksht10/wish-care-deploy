// app/shop/register/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import RegisterShopClient from "./RegisterClient";

export default async function Page() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const shop = await prisma.shop.findFirst({
    where: { owner: { email: session.user.email } },
    select: { slug: true },
  });

  if (shop) {
    redirect(`/shop/${shop.slug}`);
  }

  return <RegisterShopClient />;
}

