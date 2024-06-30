import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

interface User {
  id: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const users: User[] = await prisma.user.findMany({
    select: {
      id: true,
    },
    take: 1,
  });

  return [
    {
      url: "https://precedent.dev",
      lastModified: new Date(),
    },
    ...users.map((user: User) => ({
      url: `https://precedent.dev/${user.id}`,
      lastModified: new Date(),
    })),
  ];
}
