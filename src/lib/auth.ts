import { auth } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { redirect } from "next/navigation";

export type AuthSession = {
  session: {
    user: {
      id: string;
      name?: string;
      lastName?: string;
      email?: string;
      username?: string;
      img?: string;
    };
  } | null;
};

export const getUserAuth = async (): Promise<AuthSession> => {
  const { userId, sessionClaims } = await auth();

  if (userId) {
    return {
      session: {
        user: {
          id: userId,
          name: sessionClaims?.name,
          lastName: sessionClaims?.lastName,
          email: sessionClaims?.email,
          username: sessionClaims?.username,
        },
      },
    } as AuthSession;
  } else return { session: null };
};

export const checkAuth = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
};

export const getUserId = async (ctx: {
  session?: {
    user?: {
      id?: string;
      name?: string;
      lastName?: string;
      email?: string;
      username?: string;
      img?: string;
    };
  };
}) => {
  const userId = ctx.session?.user?.id;
  if (!userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return userId;
};
