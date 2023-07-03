import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

import { POSTS_PER_PAGE } from "@/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);
      const { body, image } = req.body;

      const post = await prisma.post.create({
        data: {
          body,
          userId: currentUser.id,
          image,
        },
      });

      return res.status(200).json(post);
    }

    if (req.method === "GET") {
      const { userId } = req.query;
      const page = Number(req.query.page);

      let posts;
      if (!page) {
        posts = await prisma.post.findMany({
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else if (userId && typeof userId === "string") {
        posts = await prisma.post.findMany({
          take: POSTS_PER_PAGE,
          skip: (page - 1) * POSTS_PER_PAGE,
          where: { userId },
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        posts = await prisma.post.findMany({
          take: POSTS_PER_PAGE,
          skip: (page - 1) * POSTS_PER_PAGE,
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }

      return res.status(200).json(posts);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
