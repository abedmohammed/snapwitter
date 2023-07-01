import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  // if the session does not have an email then the user is not signed in
  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  // look for the user from the email in the collection
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  // if the email doesnt match any in the collection then return an error
  if (!currentUser) {
    throw new Error("Not signed in");
  }

  // return the current user
  return { currentUser };
};

export default serverAuth;
