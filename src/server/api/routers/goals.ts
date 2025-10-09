import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { goals } from "~/server/db/schema";
import { eq, and } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

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
  getAll: publicProcedure
    .input(z.object({ clerkUserId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(goals)
        .where(eq(goals.clerkUserId, input.clerkUserId));
    }),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return await ctx.db
        .select()
        .from(goals)
        .where(and(eq(goals.id, input.id), eq(goals.clerkUserId, userId)));
    }),
  create: publicProcedure
    .input(createGoalSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      await ctx.db.insert(goals).values({ ...input, clerkUserId: userId });
    }),
  update: publicProcedure
    .input(updateGoalSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      await ctx.db
        .update(goals)
        .set(input)
        .where(and(eq(goals.id, input.id), eq(goals.clerkUserId, userId)));
    }),
});
