import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { goals } from "~/server/db/schema";
import { eq, and } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { getUserId } from "~/lib/auth";

const createGoalSchema = z.object({
  name: z.string().min(1, "Name is required").max(256),
  description: z.string().optional(),
  startDate: z.date(),
  targetDate: z.date(),
  status: z.enum(["active", "completed", "paused"]),
});

const updateGoalSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(256),
  description: z.string().optional(),
  startDate: z.date().optional(),
  targetDate: z.date().optional(),
  status: z.enum(["active", "completed", "paused"]).optional(),
});

export const goalsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    await getUserId(ctx);
    return await ctx.db
      .select()
      .from(goals)
      .where(eq(goals.clerkUserId, ctx.session?.user?.id ?? ""));
  }),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      await getUserId(ctx);
      return await ctx.db
        .select()
        .from(goals)
        .where(
          and(
            eq(goals.id, input.id),
            eq(goals.clerkUserId, ctx.session?.user?.id ?? ""),
          ),
        );
    }),
  create: publicProcedure
    .input(createGoalSchema)
    .mutation(async ({ ctx, input }) => {
      await getUserId(ctx);
      await ctx.db
        .insert(goals)
        .values({ ...input, clerkUserId: ctx.session?.user?.id ?? "" });
    }),
  update: publicProcedure
    .input(updateGoalSchema)
    .mutation(async ({ ctx, input }) => {
      await getUserId(ctx);
      await ctx.db
        .update(goals)
        .set(input)
        .where(
          and(
            eq(goals.id, input.id),
            eq(goals.clerkUserId, ctx.session?.user?.id ?? ""),
          ),
        );
    }),
});
