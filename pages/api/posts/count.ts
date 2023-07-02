import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { userId } = req.query;

    let count;

    if (userId && typeof userId === "string") {
      count = await prisma.post.count({
        where: { userId },
      });
    } else {
      count = await prisma.post.count();
    }

    return res.status(200).json(count);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
